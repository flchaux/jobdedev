var Airtable = require('airtable');

export default function AirtableHelper(apiKey, baseId){
    var base = new Airtable({apiKey: apiKey}).base(baseId);

    function _prepareData(result)
    {
        const obj = result.fields;
        obj.id = result.id;
        return obj;
    }

    function _filterFormula(filter){
        if(typeof filter === 'string') 
            return filter;
        var formula = '';
        for (const [key, value] of Object.entries(filter)) {
            formula += `{${key}} = '${value}'`
        }
        return formula;
    }

    async function fetchAll(table, filter){
        return new Promise(resolve => {
            base(table).select(filter !== undefined ? {
                filterByFormula: _filterFormula(filter)
            } : {}).all(function(err, records) {
                if (err) { console.error(err); return; }
                const results = []
                records.forEach((record) => results.push(_prepareData(record)))
                resolve(results);
            });
        })
    }

    async function _fetchOne(table, select){
        return new Promise(resolve => {
            base(table).select(select).firstPage(function(err, records) {
                if (err) { console.error(err); return; }
                resolve(_prepareData(records[0]));
            });
        })
    }
    async function fetchOne(table, filter){
        return _fetchOne(table, { 
            filterByFormula: _filterFormula(filter)
        })
    }

    async function fetchOneById(table, id){
        return new Promise(resolve => {
            base(table).find(id, function(err, record) {
                if (err) { console.error(err); return; }
                resolve(_prepareData(record));
            });
        })
    }

    async function update(table, id, data) {
        return new Promise(resolve => {
            base(table).update([
                {
                  "id": id,
                  "fields": data
                }
              ], function(err, records) {
                if (err) {
                    resolve({success: false, error: err});
                    return;
                }
                resolve({success: true, result:  _prepareData(records[0])});
              });
        })
    }

    async function create(table, data) {
        return new Promise(resolve => {
            base(table).create([
                {
                  "fields": data
                }
              ], function(err, records) {
                if (err) {
                    console.warn('Unable to create: ');
                    console.warn(data);
                    resolve({success: false, error: err});
                    return;
                }
                
                resolve({success: true, result: _prepareData(records[0])});
              });
        })
    }

    async function destroy(table, id){
        return new Promise(resolve => {
            base(table).destroy([id], function(err, deletedRecords) {
                if (err) {
                    console.error(err);
                    resolve({success: false, error: err})
                    return;
                }
                resolve({success: true, result: deletedRecords});
            });
        })
    }

    return {
        fetchAll,
        fetchOne,
        update,
        create,
        destroy,
        fetchOneById,
    }
}