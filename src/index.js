/* 1 - Any code related to DOM manipulation should go in init or function called inside init. This will make sure JS executes after the DOM is fully loaded.
2 - Add event listener to the form, to capture form data and override form's default behaviour. First, target the DOM element.
3 - Then, add the event listener to the form. The event will be 'submit', because it's a form.
4 - The event object that gets passed in to our callback contains a particular method we need in order to override our form's behavior (refreshing before capturing the data) — preventDefault(). Calling this inside our callback will stop the page from refreshing and allow us to do something else instead. We can confirm the event is working by adding a console.log in our callback.
5 - There is quite a lot stored on this event object, but we only need one thing: if we're fetching data based off a user input, we need to get the value of whatever the user entered; whatever you just entered into the form. There are two ways we can get this value:
5.1 - The event object actually contains the value we need.
5.2 - We can select the specific DOM element and get its value.
Access Input Value from an Event Object
To get the value from our event object, we first want to access event.target, which returns the DOM element targeted by our event, a <form> in our case.
event.target.children[1].value;
(whatever you typed into the input)
Access Input Value Directly
We will always need to use event.preventDefault() to stop the page from refreshing. However, we don't necessarily need to use the event to get the value we need. We can also choose to access the input element directly.
const input = document.querySelector("input#searchByID");
Both options work for getting the value we need.
With this data, and the default form behavior overridden, we can set up a fetch request.
6 - Fetch Data Based on User Input
Let's first set up the basic shell of our fetch request. To make sure everything is working and we can connect to the JSON server, we'll send a basic request to 'http://localhost:3000/movies'
These three objects represent the three 'records' available from the movies API. In our example, this is enough for us to move on — we have our user input accessible in input.value, and each object in data has an id property. We could now iterate over data and find a match between input.value and id.
7 - However, it isn't usually the case that we want to get all records from an API or server. It would be helpful if we could have the 'server' do that work for us.
JSON Server follows RESTful conventions. As a result of these conventions, we can expect to be able to access specific records directly by providing the appropriate parameter in our request URL.
If you open a new tab in your browser and visit http://localhost:3000/movies/1, instead of seeing all three movie objects, you'll be presented with the object with 1 as its id. 
We need to modify the URL we pass to our fetch function based on the input typed into the HTML form. Using interpolation, we can adapt our existing code to do this:
fetch(`http://localhost:3000/movies/${input.value}`)
8 - Display Fetched Data on the Page
We've captured some user input and used it to customize a fetch request to our JSON server. The final step in our code-along is to display some of the retrieved data on the page. In the HTML, we have a section element with an id, "movieDetails", that contains some filler content.
Let's replace Title and Summary with data we retrieved from our server. To do this, we'll work inside the second then of our fetch request. First, we'll access the DOM and store the two elements in JavaScript.
Here again, we could access these elements in many ways, this is just one way to approach it. We could add id attributes to the h4 and p tags directly.
Next, we want to change the contents of our title and summary elements based on the retrieved data. We can do this by setting their innerText values to the appropriate values in our data.
*/

const init = () => {
  const inputForm = document.querySelector("form");

  inputForm.addEventListener('submit', event => {
    event.preventDefault();
    const input = document.querySelector('input#searchByID');
    //console.log(input.value);

    fetch(`http://localhost:3000/movies/${input.value}`)
    .then(resp => resp.json())
    .then(data => { 
      const title = document.querySelector('section#movieDetails h4');
      const summary = document.querySelector('section#movieDetails p');
      //console.log(data.title)

      title.innerText = data.title;
      summary.innerText = data.summary;
    });
  });
};

document.addEventListener('DOMContentLoaded', init);







