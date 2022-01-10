//---------Variables-----------
var tipAmountText = $(".price-tip");
var totalAmountText = $(".price-total");
var resetBtn = $(".reset-btn");
var customTipInput = $("input.small-box");

var numPeopleInputNumbar;
var selectedTipButton;

var bill = 0;
var numPeople = 1;
var tipPercent = 0;

var noZeroActive = false;
var resetBtnActive = false;

//---------Events------------

//Tip buttons
$("button.small-box").click(function () {

  customTipInput.val(null);
  deselectLastTip();

  selectedTipButton = $(this);
  selectedTipButton.addClass("small-box-active");

  tipPercent = Number($(this).val()) * 0.01;
  calculatePrice();
});

//Custom Tip
customTipInput.click(function () {

  deselectLastTip();
  tipPercent =  Math.abs(Number($(this).val())) * 0.01;
  calculatePrice();

});

customTipInput.on("keyup", function(){

  tipPercent =  Math.abs(Number($(this).val())) * 0.01;
  calculatePrice();

})

//Bill input
$("#bill").on("keyup", function(){

  bill = Math.abs(Number($(this).val()));
  calculatePrice();
  
});

//Number of people input
$("#num-people").on("keyup", function(){

  numPeople =  Math.abs(Number($(this).val()));
  numPeopleInputNumbar = $(this);

  if(noZeroActive){
    disableNoZero();
  }

  if(numPeople == 0){
    $(this).addClass("num-bar-wrong");
    $(this).css("border-color", "orange");
    $(".no-zero").css("visibility", "visible");
    noZeroActive = true;
  }

  calculatePrice();
});

//Reset button
resetBtn.on("click", function(){

  tipAmountText.text("$0.00");
  totalAmountText.text("$0.00");

  deselectLastTip();

  $("#bill").val(null);
  $("#num-people").val(null);
  customTipInput.val(null);

  resetBtnActive = false;
  resetBtn.attr("disabled", "disabled");

  if(noZeroActive){
    disableNoZero();
  }

  tipPercent = 0;
  bill = 0;
  numPeople = 1;

});

//-----------Functions---------
function disableNoZero() {

  numPeopleInputNumbar.removeClass("num-bar-wrong");
  numPeopleInputNumbar.css("border-color", "hsl(172, 67%, 45%)");
  $(".no-zero").css("visibility", "hidden");
  noZeroActive = false;

}

function deselectLastTip() {

  if (selectedTipButton) {
    selectedTipButton.removeClass("small-box-active");
  }

}

function calculatePrice(){
  
  if(numPeople != 0){

    var totalTipAmount = bill * tipPercent;

    var tipAmount = totalTipAmount / numPeople;
    var totalAmount = (bill + totalTipAmount)  / numPeople;
  
    //Round to 2 decimal places
    tipAmount = (Math.round((tipAmount + Number.EPSILON) * 100) / 100).toFixed(2);
    totalAmount = (Math.round((totalAmount + Number.EPSILON) * 100) / 100).toFixed(2);
  
    tipAmountText.text("$" + tipAmount);
    totalAmountText.text("$" + totalAmount);

  }

  if(!resetBtnActive){
    resetBtn.removeAttr("disabled");
    resetBtnActive = true;
  }
  
}