const express = require('express');
const router = express.Router();
const Views = require('../modles/View');
const Pages = require('../modles/Page'); 


// // GET all users
// router.get('/users', async (req, res) => {
//   try {
//     const users = await Users.findAll();
//     res.json(users);
//   } catch (error) {
//     console.error('Error querying the database:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });


// track-viewability
router.post('/track-viewability', async (req, res) => {
  
  const adId = req.body.adId;
  
  // Add code to log viewability information or perform tracking here
  if(adId){
    // res.send(`Ad ${adId} became viewable.`)
    res.status(200).json({ message: 'Viewability tracked' });

  }
  else{
    throw new Error('missing id')
  }
  // res.status(200).json({ message: 'Viewability tracked' });
});


// track-viewability
router.post('/track-page-load', async (req, res) => {
  const { timestamp, page } = req.body;

  try {
    let returnedPage = await Pages.findOne({ where: { ID: page } });

    if (returnedPage) {
      await returnedPage.update({ PageLoad: timestamp });
      console.log('Page load tracked:', timestamp);
      res.status(200).json({ message: 'Page load tracked' });
    } else {
      console.log('Page not found for ID:', page);
      res.status(404).json({ error: 'Page not found' });
    }
  } catch (e) {
    console.error('Error while tracking page load:', e);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// track-time-spent
router.post('/track-time-spent', async (req, res) => {
  
        const { timeSpent, page } = req.body;
        try{
          console.log('Time spent on page tracked:', timeSpent);
          let returnedPage = await Pages.findOne({where: {ID: page}})
          returnedPage.update({TimeSpent:timeSpent})
          res.status(200).json({ message: 'Time spent on page tracked' });
        }catch(e){
          throw new Error(e)
        }
  
 });


// Endpoint for tracking exit intent
router.post('/track-exit-intent', async (req, res) => {
  
  const { exitIntent } = req.body;
  if (exitIntent) {
    console.log('Exit intent tracked');
  }
  res.status(200).json({ message: 'Exit intent tracked' });
 });
 
// /track-click-count
router.post('/track-click-count', async (req, res) => {
  
  const { count,ad } = req.body;
  clickCount = count;
  try{
    let returnedAd = await Views.findOne({where: {ID: ad}})
    returnedAd.update({ClicksSum:count})
    res.json({ message: 'Click count updated' });
  }catch(e){
          throw new Error(e)
        }
 });
 

  
// /get timeSpent
router.get('/timeSpent', async (req, res) => {
  
  try {
    const pages = await Pages.findAll({ attributes: ['ID', 'PageName', 'TimeSpent'] });
    res.json(pages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
 });
 


module.exports = router;
