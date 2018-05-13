import { Context } from "koa";
const Langdetect = require("langdetect");
const IsoConv = require("iso-language-converter");

export async function detectLanguage(ctx: Context) {
  // BodyParser will return {} if parsing fails.
  if (ctx.request.body) {
    // If we don't have "text" in the JSON body, we can't continue.
    if (ctx.request.body.hasOwnProperty("text")) {
      let text = ctx.request.body.text;
      try {
        let result = await Langdetect.detect(text);

        // IsoConv doesn't handle zh-cn, zh-tw. They don't seem standard anyway.
        let lang = IsoConv(result[0].lang) || result[0].lang;
        if (lang == "zh-cn") {
          lang = "Simplified Chinese";
        } else if (lang == "zh-tw") {
          lang = "Traditional Chinese";
        }
        let final = {
          text: text,
          language: lang,
          confidence: result[0].prob
        };
        ctx.ok(final);
      } catch (err) {
        ctx.badRequest({
          error: "Language detection failed: " + err.message
        });
      }
    } else {
      ctx.badRequest({
        error: "Please supply a correct JSON payload."
      });
    }
  }
}

export async function supportedLanguages(ctx: Context) {
  ctx.ok([
    "Afrikaans",
    "Arabic",
    "Bulgarian",
    "Bengali",
    "Czech",
    "Danish",
    "German",
    "Greek",
    "English",
    "Spanish",
    "Estonian",
    "Persian",
    "Finnish",
    "French",
    "Gujarati",
    "Hebrew",
    "Hindi",
    "Croatian",
    "Hungarian",
    "Indonesian",
    "Italian",
    "Japanese",
    "Kannada",
    "Korean",
    "Lithuanian",
    "Latvian",
    "Macedonian",
    "Malayalam",
    "Marathi",
    "Nepali",
    "Dutch",
    "Norwegian",
    "Punjabi",
    "Polish",
    "Portuguese",
    "Romanian",
    "Russian",
    "Slovak",
    "Slovene",
    "Somali",
    "Albanian",
    "Swedish",
    "Swahili",
    "Tamil",
    "Telugu",
    "Thai",
    "Tagalog",
    "Turkish",
    "Ukrainian",
    "Urdu",
    "Vietnamese",
    "Simplified Chinese",
    "Traditional Chinese"
  ]);
}
