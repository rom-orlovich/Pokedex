import { capatialFirstLetter } from "./helpers";

/**
 *
 * @param str The function get HTML syntax as string
 * @returns The exact HTML as HTML element
 */
export const createElement = (str: string) => {
  const temp = document.createElement("template");
  temp.innerHTML = str;
  return temp.content.firstElementChild as HTMLElement;
};
export const select = (
  query: string,
  scope: Document | HTMLElement = document
) => scope.querySelector(query) as HTMLElement;

export const selectByID = (queryID: string, scope = document) =>
  scope.getElementById(queryID) as HTMLElement;

export const createLabel = (textLabel: string, name: string) =>
  `<label for=${name}> ${capatialFirstLetter(textLabel)}:</label>`;

export const createLink = (
  text: string,
  path: string,
  className?: string,
  id?: string
) =>
  `<a  href="./${path}" 
  ${id ? `className='${id}` : ""}
  ${className ? `className='${className}` : ""} ${text} </a>
`;

export const createImg = (
  src = "https://www.freeiconspng.com/uploads/no-image-icon-6.png",
  alt = "Image Not Found"
) => `<img  src="${src}" alt="${alt}" />`;
