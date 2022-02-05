const en = {
  "VSCODE Top Tips": "VSCODE Top Tips",
  "Learn VS Code Productivity tips and tricks that will help you write code faster.":
    "Learn VS Code Productivity tips and tricks that will help you write code faster.",
  "Most of us think Vscode is a simple code editor. But it's not. To open project in your editor, you pull up your file explorer and then click open with Vscode. But you can do it more quickly from command line.":
    "Most of us think Vscode is a simple code editor. But it's not. To open project in your editor, you pull up your file explorer and then click open with Vscode. But you can do it more quickly from command line.",
};

const mm = {
  "VSCODE Top Tips": "VSCODE ထိပ်တန်းအကြံပြုချက်များ",
  "Learn VS Code Productivity tips and tricks that will help you write code faster.":
    "ကုဒ်မြန်မြန်ရေးရန် ကူညီပေးမည့် VS Code အကြံပြုချက်များနှင့် လှည့်ကွက်များကို လေ့လာပါ။",
  "Most of us think Vscode is a simple code editor. But it's not. To open project in your editor, you pull up your file explorer and then click open with Vscode. But you can do it more quickly from command line.":
    "ကျွန်ုပ်တို့အများစုသည် Vscode သည် ရိုးရှင်းသော code editor ဟု ထင်မြင်ကြသည်။ ဒါပေမယ့် မဟုတ်ဘူး။ သင့် ပရောဂျက်ကိုဖွင့်ရန်၊ သင်သည် သင်၏ file explorer ဆွဲထုတ်ပြီးနောက် Vscode ဖြင့်ဖွင့်မည်ကို နှိပ်ပါ။ ဒါပေမယ့် သင်က command line ကနေ ပိုမြန်အောင် လုပ်နိုင်ပါတယ်။",
};

export const getTranslatation = (lang, key) => {
  if (lang === "en") {
    return en[key];
  } else {
    return mm[key];
  }
};
