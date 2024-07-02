let mockReviews = [
    {
        content: "Lorem ipsum!",
        rating: 5
    },
    {
        content: "Lorem ipsum!",
        rating: 5
    },
    {
        content: "Dolor sit amet.",
        rating: 4
    }
]
const movieAverageRating = document.getElementById("average-rating");
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
    const reviewButton = document.createElement('p');
    reviewButton.classList.add('review-button');
    reviewButton.textContent = "Remove";
    reviewButton.onclick = () => {
        mockReviews = mockReviews.filter(r=> r !=review);
        reviewElement.remove();
        calculateAverageRating();
    }
    reviewElement.appendChild(reviewText);
    reviewElement.appendChild(reviewRating);
    reviewElement.appendChild(reviewButton);
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
        rating: parseInt(rating),
    };
    mockReviews.push(newReview)
    calculateAverageRating();
    reviewContainer.appendChild(createReviewElement(newReview));
}
function calculateAverageRating(){
    if(mockReviews.length>0){
        movieAverageRating.textContent = ((mockReviews.reduce((sum, r)=> r.rating + sum, 0)/mockReviews.length)).toFixed(1) + " / 5";
    }else{
        movieAverageRating.textContent = "0 / 5";
    }
}
function loadMockReviews(){
    console.log(mockReviews);
    calculateAverageRating();
    mockReviews.forEach(review => reviewContainer.appendChild(createReviewElement(review)));
}
loadMockReviews();