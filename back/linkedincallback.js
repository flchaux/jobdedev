/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

const qs = require('querystring')
const axios = require('axios')
const { uuid } = require('uuidv4');

const redirectSuccessUrl = 'https://jobdedev-qcnpsntiua-ew.a.run.app/'

const addDeveloper = (dev) => {
  var Airtable = require('airtable');
  var base = new Airtable({apiKey: 'keytoBw0zQgeVS3cb'}).base('appltRU3GEjhRaQiH');

  base('Developers').create([
  {
    "fields": {
      ... dev
    }
  }]);
}

const fetchEmail = (dev, code, output) => {
  console.log('fetchEmail start')
  const config = {
    headers: {
      'Authorization': 'Bearer '+code
    }
  }
  axios
  .get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', config)
  .then((res) => {
    if(res.status >= 200 && res.status < 300){
      console.log('/v2/emailAddress: '+JSON.stringify(res.data))
      dev.Email = res.data.elements[0]['handle~'].emailAddress
      dev.AppToken = uuid()
      addDeveloper(dev)
      output.redirect(redirectSuccessUrl + '?apptoken=' + dev.AppToken)
    }
  })
  .catch((error) => {
    output.status((403)).send('error during fetching email: '+error.message);
    console.error(error)
  });
  
}

const fetchProfile = (code, output) => {
  console.log('fetchProfile start')
  const config = {
    headers: {
      'Authorization': 'Bearer '+code
    }
  }
  axios
  .get('https://api.linkedin.com/v2/me', config)
  .then((res) => {
    console.log(`/v2/me statusCode: ${res.status}`)
    console.log('/v2/me data: '+JSON.stringify(res.data))
    if(res.status >= 200 && res.status < 300){
      
      const dev = {
        'FirstName': res.data.localizedFirstName,
        'LastName': res.data.localizedLastName,
        'LinkedInToken': code,
      }
      fetchEmail(dev, code, output)
      
    }
    else{
      output.status(200).send('error during fetching profile');
    }
  })
  .catch((error) => {
    output.status((403)).send('error during fetching profile '+error.response.status);
    console.error(error)
  })
  
}

exports.linkedincallback = (req, output) => {
  
  console.log(`start`)
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  const postData = qs.stringify({
    grant_type: 'authorization_code',
    code: req.query.code,
    redirect_uri: "https://jobdedev-qcnpsntiua-ew.a.run.app/linkedincallback",
    client_id: "77jpv5n3wsxtq5",
    client_secret: "rEQfCwHSn2dqFu13"
  })
  console.log(`post: ${postData}`)
  axios
  .post('https://www.linkedin.com/oauth/v2/accessToken', postData, config)
  .then((res) => {
    console.log(`oauth/v2/accessToken statusCode: ${res.status}`)
    console.log(`data: JSON.stringify(${res.data})`)
    if(res.status >= 200 && res.status < 300){
      fetchProfile(res.data.access_token, output)
      
    }
    else{
      
      output.status(res.status).send('status: '+res.status);
    }
  })
  .catch((error) => {
    output.status((403)).send(error);
    console.error(error)
  })

};
