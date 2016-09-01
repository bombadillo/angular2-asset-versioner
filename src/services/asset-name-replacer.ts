export class AssetNameReplacer {
    replace = (fileContents, name, replacement) => {
    console.log(`replace ${name} with ${replacement}`);
    fileContents = fileContents.replace(name, replacement);
    return fileContents;   
  }
}