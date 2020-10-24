var Airtable = require('airtable');

export default function AirtableHelper(apiKey, baseId){
    var base = new Airtable({apiKey: apiKey}).base(baseId);

    function _filterFormula(filter){
        var formula = '';
        for (const [key, value] of Object.entries(filter)) {
            formula += `{${key}} = '${value}'`
        }
        return formula;
    }

    async function fetchAll(table, filter){
        
        return new Promise(resolve => {
            base(table).select({
                filterByFormula: _filterFormula(filter)
            }).all(function(err, records) {
                if (err) { console.error(err); return; }
                resolve(records);
            });
        })
    }
    async function fetchOne(table, filter){
        return new Promise(resolve => {
            base(table).select({ 
                filterByFormula: _filterFormula(filter)
            }).firstPage(function(err, records) {
                if (err) { console.error(err); return; }
                resolve(records[0].fields);
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
                resolve({success: true, result: data});
              });
        })
    }
    return {
        fetchAll,
        fetchOne,
        update
    }
}