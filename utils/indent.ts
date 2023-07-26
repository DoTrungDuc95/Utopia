export const indent = (
    str: string,
    numOfIndents: number,
    opt_spacesPerIndent: number = 0
  ) => {
    str = str.replace(/^(?=.)/gm, new Array(numOfIndents + 1).join('\t'));
    const num = new Array(opt_spacesPerIndent + 1 || 0).join(' ');
  
    return opt_spacesPerIndent
      ? str.replace(/^\t+/g, function (tabs) {
          return tabs.replace(/./g, num);
        })
      : str;
  };