/**
 * @function
 * @async
 * @description Construct a query for MongoDB from an array of MongoDBRequestFields by selecting the best candidate
 * @warning The order of MongoDBRequestFields matters
 * @devnote Parameters should be correct because they are not checked
 * 
 * @param {MongoDBRequestFields[]} array The list of options
 * @param {Object} data The data of the request
 * 
 * @returns {Object} the MongoDB query
 */
export default async (array, data) => {
    let query = {};

    let allGood;
    for (let i = 0, length = array.length; i < length; ++i) {
        const configData = array[i];

        allGood = true;
        query = {};

        for (let j = 0, length2 = configData.length; j < length2; ++j) {
            const fieldData = configData[j];

            if (data[fieldData.input] != undefined) {
                query[fieldData.field] = fieldData.convertFunc ? fieldData.convertFunc(data[fieldData.input]) : data[fieldData.input];
            } else {
                allGood = false;
                break;
            }
        }

        if (allGood) break;
    }

    if (!allGood) {
        return false;
    }

    return query;
}