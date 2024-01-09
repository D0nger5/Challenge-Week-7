const currentDay = $("#currentDay");
const container = $(".container");
const hours = { start: 9, end: 17 };

function displayTime() {
    const today = moment().format('dddd, MMMM Do');
    currentDay.text(today);
}

function createTextAreaWrapper(hour) {
    const textAreaWrapper = $("<div>").addClass("wrapper");
    const btnSave = $("<button aria-label='save-button'>").addClass("saveBtn").attr("data-hour", hour).html("<i class='fas fa-save'></i>").on("click", saveBtnHandler);
    const label = $("<span>");
    const textarea = $("<textarea aria-label='event'>").attr("id", hour).val(localStorage.getItem(hour));
    const displayHour = moment(`2023-01-01T${hour < 10 ? "0" + hour : hour}:00:00`).format("ha");

    textAreaWrapper.append(label.html(`<span class="hour">${displayHour}</span>`)).append(textarea).append(btnSave);

    return textAreaWrapper;
}

     $(`<button class="=btn btn-primary clear"></button>`).text("Clear Current Data").appendTo(".clear");

     $(".clear").on("click", function (event) {
         event.preventDefault();
         localStorage.clear();
         location.reload()
     });

function updateTextAreaClass(textarea, currentTime, i) {
    if (i < currentTime) {
        textarea.addClass("past");
    } else if (i == currentTime) {
        textarea.addClass("present");
    } else {
        textarea.addClass("future");
    }
}

function saveBtnHandler(e) {
    const button = $(e.currentTarget);
    const hour = button.attr("data-hour");
    const textarea = $(`#${hour}`);

    if (textarea.val().trim() === "") {
        localStorage.removeItem(hour);
    } else {
        localStorage.setItem(hour, textarea.val());
        displaySavedMessage();
    }
}

function displaySavedMessage() {
    const displayMessage = $("#saved-message");
    displayMessage.toggleClass("hideMessage");
    setTimeout(() => {
        displayMessage.toggleClass("hideMessage");
    }, 2000);
}

function initializePlanner() {
    displayTime();

    const currentTime = moment().format("H");

    for (let i = hours.start; i <= hours.end; i++) {
        const textAreaWrapper = createTextAreaWrapper(i);
        container.append(textAreaWrapper);
        const textarea = textAreaWrapper.find("textarea");
        updateTextAreaClass(textarea, currentTime, i);
    }
}

initializePlanner();
