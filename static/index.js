let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

const movieAverageRating = document.getElementById("average-rating");
const reviewContainer = document.getElementById("review-container");
const reviewForm = document.getElementById("review-form");
const reviewFormText = document.getElementById("review-text-input");

function createReviewElement(review) { 
    const reviewElement = document.createElement('div');
    reviewElement.classList.add('review-post');

    const reviewText = document.createElement('p');
    reviewText.classList.add('review-text');
    reviewText.textContent = review.content;

    const reviewRating = document.createElement('p');
    reviewRating.classList.add('review-rating');
    reviewRating.textContent = review.rating + " / 5";

    const reviewStars = document.createElement('div');
    reviewStars.classList.add('stars-rating');

    for(let i = 1; i <= 5; i++){
        const star = document.createElement('img');
        star.src = "star.png";
        if(i<=review.rating){
            star.classList.add('checked');
        }
        else {
            star.classList.add('unchecked');
        }
        reviewStars.appendChild(star);
    }
    
    const reviewButton = document.createElement('button');
    reviewButton.classList.add('review-button');
    reviewButton.textContent = "Remove";

    reviewButton.onclick = () => {
        reviews = reviews.filter(r=> r !=review);
        if(reviews.length == 0){
            localStorage.removeItem("reviews");
        }else {
            localStorage.setItem("reviews", JSON.stringify(reviews));
        }
        reviewElement.remove();
        calculateAverageRating();
    }

    reviewElement.appendChild(reviewText);
    reviewElement.appendChild(reviewRating);
    reviewElement.appendChild(reviewStars);
    reviewElement.appendChild(reviewButton);

    return reviewElement;
}

reviewForm.onsubmit = (ev)=>{
    ev.preventDefault();

    const content = reviewFormText.value.trim();
    const reviewFormData =new FormData(reviewForm);
    const rating = reviewFormData.get("rating");
    if(!content || !rating){
        return;
    }

    const newReview = {
        content: content,
        rating: parseInt(rating),
    };
    reviews.unshift(newReview)
    localStorage.setItem("reviews", JSON.stringify(reviews));

    calculateAverageRating();

    reviewContainer.prepend(createReviewElement(newReview));

    resetForm();
}

function resetForm(){
    reviewFormText.value = null;
    document.querySelector('.star-radio-button:checked').checked=false;
}

function calculateAverageRating(){
    if(reviews.length>0){
        movieAverageRating.textContent = ((reviews.reduce((sum, r)=> r.rating + sum, 0)/reviews.length)).toFixed(1) + " / 5";
    }else{
        movieAverageRating.textContent = "0 / 5";
    }
}

function loadReviews(){
    calculateAverageRating();
    reviews.forEach(review => reviewContainer.appendChild(createReviewElement(review)));
}

loadReviews();