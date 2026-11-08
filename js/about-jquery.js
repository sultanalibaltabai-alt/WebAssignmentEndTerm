function toggleTeamBio() {
    const button = $(this);
    const isOpen = button.text() === 'Show less';
    button.siblings('.team-bio').slideToggle();
    button.closest('.team-card').toggleClass('team-card-open');
    button.text(isOpen ? 'Read more' : 'Show less');
}

$(function () {
    $('.team-toggle').on('click', toggleTeamBio);
});
