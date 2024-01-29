import { PublishCommand, PublishCommandInput, SNSClient } from "@aws-sdk/client-sns";

import { removeNonLetters } from "./helpers";
import { AnalysedDream } from "~/lambdas/analysedDreams/types";

export async function analyseDream(query: string) {
  let response;
  let data;
  try {
    response = await fetch(
      "https://ve1j9omi25.execute-api.eu-west-1.amazonaws.com/dreams/analyse",
      {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: query,
      }
    );
    data = await response.json();
    console.log("Analysing Dream - query: ", query);
    console.log("Analysing Dream - response: ", response);
    console.log("Analysing Dream - data: ", data);
  } catch (err: unknown) {
    console.log("Analysing Dream - api error");
    console.log(err);
    throw new Error("Sorry, there was an error trying to analyse your dream. Please try again. 🙏");
  }

  if (data.body.error) {
    console.log("Analysing Dream - data body");
    console.log(data.body);
    throw new Error("Sorry, there was an error trying to analyse your dream. Please try again. 🙏");
  }
  return removeNonLetters(data.body.result.text);
}

export const getUsersDreams = async (id: string) => {
  try {
    console.log(id);

    const response = await fetch(
      "https://ve1j9omi25.execute-api.eu-west-1.amazonaws.com/dreams/user123"
      // + id || "user123"
    );
    const result = await response.json();
    console.log("getUsersDreams - result: ", result);
    return result;
  } catch (err) {
    console.log("getUsersDreams - error: ", err);
    throw new Error("Sorry, something went wrong. Please refresh the page and try again. 🙏");
  }
};

export async function deleteDream(dreamId: string) {
  try {
    const response = await fetch(
      "https://ve1j9omi25.execute-api.eu-west-1.amazonaws.com/dreams/" + dreamId,
      {
        method: "DELETE",
      }
    );
    const result = await response.json();
    if (result.error) {
      console.log(result.error);
    }
    console.log("Deleting Dream - result: ", result);
    alert("Dream deleted! 👋");
    return result;
  } catch (err) {
    console.log("Error deleting dream 🚨");
    console.log(err);
    throw new Error("Sorry, we could not delete your dream. Please try again. 🙏");
  }
}

export async function publishAnalysedDream(analysedDream: AnalysedDream, accessKeyId = "", secretAccessKey = "", dev = "") {
  const credentials = {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  };

  let snsClient = new SNSClient({
    region: "eu-west-1",
    credentials,
  });
  if (dev) {
    snsClient = new SNSClient({
      region: "eu-west-1",
      endpoint: "http://localhost:4002",
      credentials: {
        accessKeyId: "",
        secretAccessKey: "",
      },
    });
  }

  const { id, userId, query, context, response, date } = analysedDream;
  console.log("publishAnalysedDream - analysedDream obj: ", analysedDream);
  const input: PublishCommandInput = {
    TopicArn: "arn:aws:sns:eu-west-1:410317984454:AnsweredQueryTopic",
    Message: JSON.stringify({ id, userId, query, context, response, date }),
  };

  try {
    const command = new PublishCommand(input);
    const snsResponse = await snsClient.send(command);
    return { snsResponse };
  } catch (err: unknown) {
    console.log("publishAnalysedDream - Error: ", err);
    throw new Error("Sorry, we could not save your dream. Please try again. 🙏");
  }
}
