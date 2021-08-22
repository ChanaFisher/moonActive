const router = require('express').Router();
const apiTable = require('../controllers/table');
router.post('/deleteField',apiTable.deleteField)
router.post('/duplicateField',apiTable.duplicateField)
router.post('/addData', apiTable.addData);
router.post('/updateField',apiTable.updateField)
router.post('/getAllData', apiTable.getAllData);
router.get('/getAllKeys', apiTable.getAllKeys);


module.exports = router;