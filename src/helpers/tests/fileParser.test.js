import assert from "assert";
import {
    parseEnvContent
} from "../fileParser";

describe("Test file parser", () => {
  it("should correctly parse variables whether in quotes or not", () => {
    const expected = {
        KEY1: "value1",
        KEY2: "value2",
        KEY3: "value3"
    }

    const result = parseEnvContent(`
    KEY1="value1"

    KEY2=value2
    KEY3=value3
    `);
    assert.deepStrictEqual(result, expected);
  });

  it("Test the function's handling duplicate key values", () => {
    const expected = {
        KEY1: "value1",
        KEY2: "value3",
    }
    const result = parseEnvContent(`
    KEY1="value1"

    KEY2=value2
    KEY2=value3
    `);
    
    assert.deepStrictEqual(result, expected);
  });

  it("Test bad file format", () => {
    const expected = {}
    const result = parseEnvContent(`
    FROM node:16-alpine as build_step
    WORKDIR /app
    COPY package.json yarn.lock ./
    RUN yarn install --ignore-engines
    `);
    
    assert.deepStrictEqual(result, expected);
  });

  it("Test second bad file format", () => {
    const expected = {}
    const result = parseEnvContent(
    `const PodsList = () => {
        const { isRetrieving, pods, isFetched } = useSelector(
          (state) => state.podsReducer
        );
      
        const dispatch = useDispatch();`);
    
    assert.deepStrictEqual(result, expected);
  });
  it("Single quotes variables", () => {
    const expected = {
        KEY1: "value1",
        KEY2: "value2",
        KEY3: "value3"
    }
    const result = parseEnvContent(
    `
    KEY1="value1"

    KEY2='value2'
    KEY3=value3
    
    `);
    
    assert.deepStrictEqual(result, expected);
  });


  
});
