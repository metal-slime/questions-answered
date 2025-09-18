import { input } from '@inquirer/prompts';
import { getHistory, setHistory } from './history.js';


export const runPromptUntilExit = async () => {
  console.log('Welcome to Questions Answered.');
  console.log('To see your history, type history.');
  console.log('To include your history, after the ? type history, ie: "Why is the sky blue? history"')
  console.log('To quit type "exit" or press Ctrl+C.');
  console.log('To see this again, type "help".');
  while (true) { // Keep prompting until 'exit' is typed
    try {
      const question = await input({
        message: 'Please ask your questions.',
        validate: (value) => {
          if (value.toLowerCase() === 'exit') {
            // If 'exit' is typed, we will handle the exit outside the validation
            return true; // Allow the prompt to resolve with "exit"
          }
          return true; // Allow any other input
        },
      });


      switch (question.trim().toLowerCase()) {
        case "exit":
          console.log('Exiting application.');
          process.exit(0);
          break;
        case "help":
          console.log('To see your history, type history.');
          console.log('To include your history, after the ? type history, ie: "Why is the sky blue? history"')
          console.log('To quit type "exit" or press Ctrl+C.');
          console.log('To see this again, type "help".');
          break;
        case "history":
          const history = await getHistory();
          if (history.length > 0) {
            console.log('History:')
            history.forEach((item, index) => {
              console.log(`Question #${index + 1}:`);
              console.log(item.question);
              console.log(`Answer #${index + 1}:`);
              console.log(item.answer);
            });
          } else {
            console.log('There is no user history.');
          }
          break;
        case "":
          console.log('Please ask a question.');
          break;
        default:
          const answer = await fetch('http://localhost:3000/questions', {
            method: 'post',
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({
              "question": question.endsWith('? history') ? question.replace('? history', '?') : question,
              "useHistory": question.endsWith('? history') ? true : false
            })
          });
          const response = await answer.json();
          console.log(`Your answer: ${response.answer}`);
          await setHistory(question, response.answer);
      }
    }
    catch (err) {
      if (err.name === 'ExitPromptError') {
        console.log('Exiting application.');
        process.exit(0); // Terminate the process
      } else {
        console.log(err)
      }
    }
  }
}