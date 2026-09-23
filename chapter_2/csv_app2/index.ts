import prompt from "prompt";
import { createObjectCsvWriter } from "csv-writer";

interface Contact {
  name: string;
  number: string;
  email: string;
}

type PromptResponses = {
  name: string;
  number: string;
  email: string;
};

type ContinueResponse = {
  again: string;
};
const csvWriter = createObjectCsvWriter({
  path: "./contacts.csv",
  append: true,
  header: [
    { id: "name", title: "NAME" },
    { id: "number", title: "NUMBER" },
    { id: "email", title: "EMAIL" },
  ],
});

prompt.start();
prompt.message = "";

const saveContactToCSV = async ({
  name,
  number,
  email,
}: Contact): Promise<void> => {
  try {
    await csvWriter.writeRecords([{ name, number, email }]);
    console.log(`${name} Saved!`);
  } catch (error: unknown) {
    console.error(error);
  }
};

const startApp = async (): Promise<void> => {
  const questions = [
    { name: "name", description: "Contact Name" },
    { name: "number", description: "Contact Number" },
    { name: "email", description: "Contact Email" },
  ];

  const responses = await prompt.get<PromptResponses>(questions);

  await saveContactToCSV({
    name: responses.name,
    number: responses.number,
    email: responses.email,
  });

  const { again } = await prompt.get<ContinueResponse>([
    {
      name: "again",
      description: "Continue?[y to continue]",
    },
  ]);

  if (again.toLowerCase() === "y") {
    await startApp();
  }
};

startApp().catch((error: unknown) => {
  console.error("Application error:", error);
});