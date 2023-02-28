import React, { useEffect, useState } from "react";
import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Button,
  useToast,
  Divider,
  Textarea,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Icon,
  Container,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useClickOutside } from "../useClickOutside";
const SearchSel = ({
  name,
  data,
  isSelect,
  fetchdat,
  setValue,
  valueD,
  setSelect,
  propertyName,
  mode,
  setModEdit,
  isDrop,
}) => {
  const ref = useClickOutside(() => {
    setVisible(false);
  });
  const [isVisible, setVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const handleKeyDown = (ev, opt) => {
    if (ev.key === "ArrowDown") {
      setSelectedIndex((selectedIndex + 1) % data.length);
      setValue(data[(selectedIndex + 1) % data.length][propertyName]);
      setSelect(false);
      setVisible(true);
    } else if (ev.key === "ArrowUp") {
      setSelectedIndex((selectedIndex - 1 + data.length) % data.length);
      setValue(
        data[(selectedIndex - 1 + data.length) % data.length][propertyName]
      );
      setVisible(true);
      setSelect(false);
    } else if (ev.key === "Enter" || ev.key === "Tab") {
      setValue(data[selectedIndex][propertyName]);
      setSelect(data[selectedIndex]);
    }
  };

  const handleSearch = (term) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setTimeoutId(
      setTimeout(() => {
        // fetch data from database using the search term
        fetchdat(term);
      }, 500)
    );
  };
  return (
    <>
      {mode == "edit" ? (
        isDrop ? (
          <FormControl>
            <FormLabel color={"blackAlpha.600"}>{name}</FormLabel>
            <InputGroup size="sm">
              <Input
                onFocus={() => {
                  fetchdat(null);
                  setVisible(true);
                }}
                onClick={() => {
                  fetchdat(null);
                  setVisible(true);
                }}
                autoComplete={"off"}
                tabIndex={0}
                onKeyDown={handleKeyDown}
                variant="flushed"
                value={valueD}
                onChange={(e) => {
                  setValue(e.target.value);
                  setSelect(null);
                  handleSearch(e.target.value);
                }}
              />
              <InputRightElement>
                <CloseIcon
                  style={{ cursor: "pointer" }}
                  boxSize={2.5}
                  onClick={() => {
                    setModEdit(false);
                    setSelect(null);
                    setValue([]);
                  }}
                ></CloseIcon>
              </InputRightElement>
            </InputGroup>
            {isVisible && data && !isSelect && (
              <div
                ref={ref}
                className="select-dropdown"
                style={{ top: "40px" }}
              >
                {data.map((e, index) => {
                  return (
                    <p
                      onClick={() => {
                        setSelect(e);
                        setValue(e[propertyName]);
                      }}
                      key={index}
                      style={{
                        backgroundColor:
                          index === selectedIndex && `rgb(238, 240, 241)`,
                      }}
                    >
                      {e[propertyName]}
                    </p>
                  );
                })}
              </div>
            )}
          </FormControl>
        ) : (
          <FormControl>
            <FormLabel color={"blackAlpha.600"}>{name}</FormLabel>
            <InputGroup size="sm">
              <Input
                variant="flushed"
                value={valueD}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
              <InputRightElement>
                <CloseIcon
                  style={{ cursor: "pointer" }}
                  boxSize={2.5}
                  onClick={() => {
                    console.log("details undedited");
                    setModEdit(false);
                    setValue(null);
                  }}
                ></CloseIcon>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        )
      ) : (
        <FormControl>
          <FormLabel color={"blackAlpha.600"}>{name}</FormLabel>
          <Input
            onFocus={() => {
              fetchdat(null);
              setVisible(true);
            }}
            onClick={() => {
              fetchdat(null);
              setVisible(true);
            }}
            // onBlur={() => {
            //   isVisible(false);
            // }}
            autoComplete={"off"}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            value={valueD}
            onChange={(e) => {
              setValue(e.target.value);
              setSelect(null);
              handleSearch(e.target.value);
            }}
          />
          {isVisible && data && !isSelect && (
            <div ref={ref} className="select-dropdown" style={{ top: "75px" }}>
              {data.map((e, index) => {
                return (
                  <p
                    // onMouseEnter={() => {
                    //   setValue(e[propertyName]);
                    // }}
                    onClick={() => {
                      setSelect(e);
                      setValue(e[propertyName]);
                    }}
                    key={index}
                    style={{
                      backgroundColor:
                        index === selectedIndex && `rgb(238, 240, 241)`,
                    }}
                  >
                    {e[propertyName]}
                  </p>
                );
              })}
            </div>
          )}
        </FormControl>
      )}
    </>
  );
};

export default SearchSel;
