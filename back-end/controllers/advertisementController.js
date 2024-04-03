const db = require('../models/db');

// Controller function for creating a new advertisement
const createAdvertisement = (req, res, next) => {
    const { title, description, price, location_id, sublocation_id, telephoneNumbers } = req.body;
    const { category_id, subcategory_id, adType } = req.body;
    const images = req.files.map(file => file.path); // Map file paths

    db.beginTransaction((err) => {
        if (err) {
            console.error('Error beginning transaction:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // Function to handle query errors
        const handleQueryError = (error, errorMessage) => {
            console.error(errorMessage, error);
            db.rollback(() => {
                console.error('Transaction rolled back due to error');
                return res.status(500).json({ error: errorMessage });
            });
        };
        

    // Function to insert form data based on category ID
    const insertFormData = (formData, callback) => {
        db.query(formData.query, formData.values, (error, results, fields) => {
            if (error) {
                handleQueryError(error, `Error creating ${formData.table}`);
                return;
            }
            callback(results.insertId);
        });
    };

    // Define form data for different categories
    const formDatas = {
        '1': {
            table: 'vehiclesform',
            query: 'INSERT INTO vehiclesform (brand, model, yearOfManufacture, mileage, transmission, Part_or_Accessory, BicycleType) VALUES (?, ?, ?, ?, ?, ?, ?)',
            values: [req.body.brand, req.body.model, req.body.yearOfManufacture, req.body.mileage, req.body.transmission, req.body.Part_or_Accessory, req.body.BicycleType]
        },
        '2': {
            table: 'property',
            query: 'INSERT INTO property (landSize, unit, address, bedrooms, bathrooms, propertyType) VALUES (?, ?, ?, ?, ?, ?)',
            values: [req.body.landSize, req.body.unit, req.body.address, req.body.bedrooms, req.body.bathrooms, req.body.propertyType]
        },
        '3': {
            table: 'electronicsform',
            query: 'INSERT INTO electronicsform (brand, model, computerType, tvType, screenSize, accessoryType, electronicOtherItemType) VALUES (?, ?, ?, ?, ?, ?, ?)',
            values: [req.body.brand, req.body.model, req.body.computerType, req.body.tvType, req.body.screenSize, req.body.accessoryType, req.body.electronicOtherItemType]
        },
        '4': {
            table: 'fashionform',
            query: 'INSERT INTO fashionform (gender, brand, size, beautyProductType, otherFashionItem) VALUES (?, ?, ?, ?, ?)',
            values: [req.body.gender, req.body.brand, req.body.size, req.body.beautyProductType, req.body.otherFashionItem]
        },
        '5': {
            table: 'homeappliancesform',
            query: 'INSERT INTO homeappliancesform (brand, kitchenItem, laundryItem, cleaningItems, otherHomeAppliancesItem) VALUES (?, ?, ?, ?, ?)',
            values: [req.body.brand, req.body.kitchenItem, req.body.laundryItem, req.body.cleaningItems, req.body.otherHomeAppliancesItem]
        },
        '6': {
            table: 'furniturehomedecorsform',
            query: 'INSERT INTO furniturehomedecorsform (material, design, furnitureOrHomeDecorType) VALUES (?, ?, ?)',
            values: [req.body.material, req.body.design, req.body.furnitureOrHomeDecorType]
        },
        '7': {
            table: 'sportandfitnessform',
            query: 'INSERT INTO sportandfitnessform (brand, sportAndFitnessItem, otherSportItem) VALUES (?, ?, ?)',
            values: [req.body.brand, req.body.sportAndFitnessItem, req.body.otherSportItem]
        },
        '8': {
            table: 'musicalinstrumentform',
            query: 'INSERT INTO musicalinstrumentform (brand, stringInstrumentsItem, windInstrumentsItem, otherInstrumentsItem, instrumentAccessories, recordingAndStudioEquipment, musicalOtherItems) VALUES (?, ?, ?, ?, ?, ?, ?)',
            values: [req.body.brand, req.body.stringInstrumentsItem, req.body.windInstrumentsItem, req.body.otherInstrumentsItem, req.body.instrumentAccessories, req.body.recordingAndStudioEquipment, req.body.musicalOtherItems]
        },
        '9': {
            table: 'animalsform',
            query: 'INSERT INTO animalsform (domesticAnimalType, farmAnimalType, petSuppliesAndAccessoriesItem, otherAnimalsItem) VALUES (?, ?, ?, ?, ?)',
            values: [req.body.domesticAnimalType, req.body.farmAnimalType, req.body.petSuppliesAndAccessoriesItem, req.body.otherAnimalsItem]
        },
        '10': {
            table: 'toolsandequipmentform',
            query: 'INSERT INTO toolsandequipmentform (toolType, toolPerformance) VALUES (?, ?)',
            values: [req.body.toolType, req.body.toolPerformance]
        },
        '11': {
            table: 'educationform',
            query: 'INSERT INTO educationform (schoolSupplyItem, educationalGameItem, otherEducationalItem) VALUES (?, ?, ?)',
            values: [req.body.schoolSupplyItem, req.body.educationalGameItem, req.body.otherEducationalItem]
        },
        '12': {
            table: 'otherform',
            query: 'INSERT INTO otherform (otherItemName, otherItemDescription) VALUES (?, ?)',
            values: [req.body.otherItemName, req.body.otherItemDescription]
        },
    };

    // Insert advertisement data into the ads table
    if (formDatas.hasOwnProperty(category_id)) {
        insertFormData(formDatas[category_id], (categoryForm_id) => {
            // Insert data into the ads table along with the form id
            const adsQuery = 'INSERT INTO ads (title, description, price, location_id, sublocation_id, category_id, subcategory_id, adType, categoryForm_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            db.query(adsQuery, [title, description, price, location_id, sublocation_id, category_id, subcategory_id, adType, categoryForm_id], (error, adsResults, fields) => {
                if (error) {
                    handleQueryError(error, 'Error creating advertisement');
                    return;
                }

                const adsId = adsResults.insertId;

                // Insert telephone numbers data into the telephone_numbers table
                const telephoneNumbersQuery = 'INSERT INTO telephonenumbers (ad_id, telephoneNumbers) VALUES (?, ?)';
                db.query(telephoneNumbersQuery, [adsId, JSON.stringify(telephoneNumbers)], (error, telephoneNumbersResults, fields) => {
                    if (error) {
                        handleQueryError(error, 'Error inserting telephone numbers');
                        return;
                    }

                    const telephoneNumbersId = telephoneNumbersResults.insertId;

                    // Insert images data into the images table
                    const imagesQuery = 'INSERT INTO images (ad_id, imagePath) VALUES (?, ?)';
                    let errorOccurred = false;
                    images.forEach(imagePath => {
                        db.query(imagesQuery, [adsId, imagePath], (error, imagesResults) => {
                            if (error && !errorOccurred) {
                                handleQueryError(error, 'Error inserting image');
                                errorOccurred = true; // Prevent multiple error handling
                                return;
                            }
                        });
                    });

                    // Commit the transaction if all operations are successful
                    db.commit((err) => {
                        if (err) {
                            console.error('Error committing transaction:', err);
                            return res.status(500).json({ error: 'Internal server error' });
                        }
                        console.log('Transaction committed successfully');
                        return res.status(200).json({ message: 'Advertisement created successfully' });
                    });
                });
            });
        });
    } else {
        console.error('Invalid category ID');
        return res.status(400).json({ error: 'Invalid category ID' });
    }


    });
};

module.exports = { createAdvertisement };
