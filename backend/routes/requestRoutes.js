const express = require('express');
const auth = require('../middleware/authMiddleware');
const {
  sendRequest,
  acceptRequest,
  withdrawRequest,
  completeSwap,
  rejectRequest
} = require('../controllers/requestControllers');

const router = express.Router();

// Send a request to a post
router.patch('/:postId/send', auth, sendRequest);

// Withdraw a previously sent request
router.patch('/:postId/withdraw', auth, withdrawRequest);

// Accept a request on a post (only by post creator)
router.patch('/:postId/accept', auth, acceptRequest);

// Reject a request on a post (only by post creator)
router.patch('/:postId/reject', auth, rejectRequest);

// Mark a swap as completed (only by post creator)
router.patch('/:postId/complete', auth, completeSwap);

module.exports = router;
