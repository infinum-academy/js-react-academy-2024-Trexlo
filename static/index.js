let mockReviews = [
    {
        content: "Lorem ipsum!",
        rating: 5
    },
    {
        content: "Dolor sit amet.",
        rating: 4
    }
]
const reviewContainer = document.getElementById("review-container");
const reviewForm = document.getElementById("review-form");
const reviewFormText = document.getElementById("review-text-input");
const reviewFormRating = document.getElementById("review-rating-input");
function createReviewElement(review) { 
    const reviewElement = document.createElement('div');
    reviewElement.classList.add('review-post');
    const reviewText = document.createElement('p');
    reviewText.classList.add('review-text');
    reviewText.textContent = review.content;
    const reviewRating = document.createElement('p');
    reviewRating.classList.add('review-rating');
    reviewRating.textContent = review.rating + " / 5";

    reviewElement.appendChild(reviewText);
    reviewElement.appendChild(reviewRating);
    return reviewElement;
}

reviewForm.onsubmit = (ev)=>{
    ev.preventDefault();
    const content = reviewFormText.value.trim();
    const rating = reviewFormRating.value;
    if(!content || !rating){
        return;
    }
    const newReview = {
        content: content,
        rating: rating,
    };
    mockReviews.push(newReview)
    reviewContainer.appendChild(createReviewElement(newReview));
}

function loadMockReviews(){
    console.log(mockReviews);
    mockReviews.forEach(review => reviewContainer.appendChild(createReviewElement(review)));
}
loadMockReviews();