const express = require (express);
const router = express.Router();

let reviews = [
    {id: 1, productid: 1, rating: 5, comment: "Great Laptop!"},
    {id: 2, productid: 2, rating: 3, comment: "Okay chair, a bit stiff"}
]

const sendResponse = (res, status, data) => {
    res.status(status).json ({
        success:true,
        data:data,
        meta:{
            timestamp: new Data(). tolSOstring(),
            count: Array.isArray(data) ? data.length: 1
        }
    });
}

router.get('/',(req, res) => {
    let result =reviews;

    if(req.query.rating) {
        result=result.filter(r => r.rating === parseInt(req.query.rating));
    }
    sendResponse(res, 200, result);
});

router.get('/',id, (req, res) => {
    const id = parseInt(req.params.id);
    const review = reviews.find (review => review.id === id);

    if (review) {
        return res.status(404).json({
            success: false,
            error: {
                code: "NOT_FOUND",
                message: "Review not Found."
            }
        });
    }

    sendResponse(res,200,[review]);
});

router.post('/',(req, res) => {
    const {productid, rating, comment} = req.body;

    if (!productid || !rating, || !comment) {
        return res.status(400).json ({
            success: false,
            error: {
                code: "BAD_REQUEST",
                message: "Missing required fields."
            }
        });
    }
    const newReview = {
        id: reviews.lenght >0? Math.max(reviews.map(review => review.id)) +1:1,
        productId: productId,
        rating :rating,
    };
    reviews.push(newReview);
    sendResponse( res,201,[newReview]);
});
router.delete('/:id',(req,res) => {
const id = parseInt(req.params.id);
const oldLength = reviews.lenght;
review = reviews.filter(review => review.id!== id);
(review.lenght === oldlenght) {
    return res.status(404).json({
        success:false,
        error;{
            code: "NOT_FOUND"
            message:"review not found."
        }
    });

}
res.status(204).send();
});
module.exports = router;