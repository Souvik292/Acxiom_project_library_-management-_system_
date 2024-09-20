function showModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}


window.onclick = function(event) {
    const membershipModal = document.getElementById('membershipModal');
    const updateModal = document.getElementById('updateModal');
    const bookMovieModal = document.getElementById('bookMovieModal');
    if (event.target == membershipModal) {
        membershipModal.style.display = "none";
    } else if (event.target == updateModal) {
        updateModal.style.display = "none";
    } else if (event.target == bookMovieModal) {
        bookMovieModal.style.display = "none";
    }
}
