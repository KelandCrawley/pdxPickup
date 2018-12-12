# pdxPickup
MERN stack website

The site is run on a free heroku plan and may take up to 15 seconds to start up!

Warning: the site is only for demonstration so none of the sessions are real! That being said feel free to sign in with google and play around with stuff and post your own fake games.

Check out the site!
https://pdxpickup.herokuapp.com/


1.1 Update

With my first major pass at improving PDX Pickup i focused on the design and code refactoring while ignoring functional improvements(with a few exceptions). Here is a quick run down of what i worked on.

-Redesigned site: Im not great at design but i want to be better. So ive been looking into what makes good ui/ux design and slowly trying   to make improvements. This pass focused on colors and text.

--Added a show page for sessions: I made session boxes clickable and gave them a show page which shows a little extra information. Its not    much but it sets up future imporvements that will make use of the show page.

--Added search by name to the browse form: Pretty straight forward. Thought this would be useful if the site was in real use.

--Mobile responsiveness fixes: With the updated design i needed to update the mobile responsiveness. While the site layout is flexible for mobile at the moment, more will be done to optimize the mobile experience in future updates.

--Code refactoring and clean up: My understanding of react improved so i made a pass at improving some of the code.

Further Detail of code improvements:

--Broke up large components that did too much into smaller components with a more focused responsibility.

--Made render functions cleaner.

 --Made better use of componetDidUpdate and componetDidMount

 --Refactored code structure to avoid state and long pass down prop chains when possible. (looking at adding redux soon and overhauling how i do state)
  
