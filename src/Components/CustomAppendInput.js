import { Box, Button, FormControl, FormLabel, GridItem, IconButton, Input, SimpleGrid } from "@chakra-ui/react";
import React, { useState } from "react";
import { useRowState } from "react-table";
import SearchSel from "./searchableSelect/searchSel";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

function CustomAppendInput() {
    const [val, setVal] = useState([])
    
    const handleAdd = () => {
        const abc = [...val,[]]
        setVal(abc)
    }

    const handleChange = (onChangeValue, i) => {
        const inputdata = [...val]
        inputdata[i] = onChangeValue.target.value;
        setVal(inputdata)
    }

    const handleDelete = (i) => {
        const deleteVal = [...val]
        deleteVal.splice(i,1)
        setVal(deleteVal)
    }

    console.log(val, "data-")

    return(
        <>
            {/* <Button onClick={() => handleAdd()}> Add </Button> */}
            <IconButton size='xs' icon={<AddIcon />} colorScheme='blue' onClick={() => handleAdd()} placeholder="Add" />
            { val.map((data, i) => {
                return(
                    <div>
                        {/* <Input value={data} onChange={e => handleChange(e, i)}/> */}
                        {/* <Button onClick={() => handleDelete(i)}>x</Button> */}

                        <SimpleGrid mt={6} rowGap={6} columns={13} columnGap={5}>
                            <GridItem colSpan={2} w="100%">
                                <Box>
                                    <SearchSel
                                        name={"Locations"}
                                        // data={locDatas}
                                        propertyName={"location_name"}
                                        // fetchdat={fetchLoc}
                                        // setSelect={setSelectedLoc}
                                        // isSelect={selectedLoc}
                                        // setValue={setLocValue}
                                        // valueD={locValue}
                                    />
                                </Box>
                            </GridItem>

                            <GridItem colSpan={2} w="100%">
                                <Box>
                                <SearchSel
                                    name={"Accountable"}
                                    // data={assocDatas}
                                    propertyName={"person_name"}
                                    // fetchdat={fetchAssoc}
                                    // setSelect={setSelectedAssoc}
                                    // isSelect={selectedAssoc}
                                    // setValue={setassocValue}
                                    // valueD={assocValue}
                                />
                                </Box>
                            </GridItem>

                            <GridItem colSpan={2} w="100%">
                                <Box>
                                <SearchSel
                                    name={"Condition"}
                                    // data={condDatas}
                                    propertyName={"conditions_name"}
                                    // fetchdat={fetchcond}
                                    // setSelect={setSelectedCond}
                                    // isSelect={selectedCond}
                                    // setValue={setConItem}
                                    // valueD={condItem}
                                />
                                </Box>
                            </GridItem>
                            
                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel color={"blackAlpha.600"}>Delivery Date</FormLabel>
                                    <Input
                                        // value={acquisition}
                                        onChange={(e) => {
                                        // setdeliveryD(e.target.value);
                                        //console.log(e.target.value);
                                        }}
                                        type="date"
                                    />
                                </FormControl>
                            </GridItem>

                            <GridItem colSpan={2} w="100%">
                                <FormControl>
                                    <FormLabel color={"blackAlpha.600"}>Property No.</FormLabel>
                                    <Input
                                        onClick={() => {}}
                                        //value={ }
                                        onChange={(e) => {
                                        // setpropertyno(e.target.value);
                                        }}
                                    />
                                </FormControl>
                            </GridItem>

                            <GridItem colSpan={2} w="100%">
                                <FormControl>
                                    <FormLabel color={"blackAlpha.600"}>Serial</FormLabel>
                                    <Input
                                        onClick={() => {}}
                                        onChange={(e) => {
                                        // setserial(e.target.value);
                                        }}
                                    />
                                </FormControl>
                            </GridItem>

                            <GridItem colSpan={2} w="100%">
                                <FormControl>
                                    <IconButton size='xs' icon={<DeleteIcon />} colorScheme='red' onClick={() => handleDelete(i)} />
                                </FormControl>
                            </GridItem>


                        </SimpleGrid>

                    </div>
                )
            })

            }
        </>
    )
}

export default CustomAppendInput;