import Block, { BlockProperties } from "./models/block";
import Image from "./models/image";

export function createBlocksFromJson(json: Object) {
  const objectArray = Object.values(json);

  const blocks = objectArray.map(({ value }) => {
    const type = value.type;

    if (value.properties)
      value.properties = beautifyBlockProperties(value.properties);

    if (type === "image") {
      return Object.assign(new Image(), value) as Image;
    }
    return Object.assign(new Block(), value) as Block;
  });

  return blocks;
}

// The Type that is returned from the API
type RawBlockProperties = { [key: string]: string[][] };

function beautifyBlockProperties(properties: RawBlockProperties) {
  let blockProperties: BlockProperties = {
    title: "",
    source: "",
    checked: "",
  };
  const propertiesArray = Object.entries(properties);

  propertiesArray.forEach((property) => {
    blockProperties[property[0]] = property[1][0][0];
  });

  return blockProperties;
}