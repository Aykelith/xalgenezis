export default async function (variable: any, ...data: any): Promise<any> {
  if (typeof variable == "function") {
    let newArgs = Array.from(arguments);
    newArgs.shift();

    return await variable.apply(null, newArgs);
  }

  return variable;
}

