import React from "react";
import render from "react-dom";
import DataContext from "../Context/Context";
import { EditIcon, CloseIcon } from "@chakra-ui/icons";
import {
    Divider,
    Text,
    Flex,
    Box,
    Input,
    InputRightElement,
    InputGroup,
} from "@chakra-ui/react";
import SearchSel from "./searchableSelect/searchSel";



export default class EditableDet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false
        }
        this.activateEdit = () => { this.setState({ isEdit: true }) }
        this.deacivateEdit = () => { this.setState({ isEdit: false }) }
    };
    componentDidMount() {
        console.log('This component did mounted;')
    };
    render() {
        const editable = [
            "Variety",
            "Country origin",
            "Details",
            "Warranty",
            "Acquisition Date",
            "Expiration Date",
        ];
        const Ddown = ["Variety", "Country origin"];
        const editableDate = ["Warranty", "Acquisition Date", "Expiration Date"];
        const { property, detail, bg, data,
            propertyName,
            fetchdat,
            setSelect,
            isSelect,
            setValue,
            valueD,
            isDrop,
            mode,
            details,
            setdetails,
            warranty,
            setwarranty,
            acquisition,
            setacquisition,
            expiration,
            setexpiration } = this.props;

        return (

            <Box bg={bg} fontSize={15} color={"blackAlpha.600"} w={"100%"} h={"auto"}>
                <Divider orientation="horizontal" />
                <Flex flexDirection={"row"} gap={0}>
                    <Text flex={1} fontWeight={"500"}>
                        {property}
                    </Text>
                    <Box
                        onDoubleClick={() => {
                            this.activateEdit();
                        }}
                    >
                        {this.state.isEdit && editable.includes(property) ? (
                            editableDate.includes(property) ? (
                                <InputGroup>
                                    <InputRightElement>
                                        <CloseIcon
                                            style={
                                                editable.includes(property) && { cursor: "pointer" }
                                            }
                                            w={3}
                                            onClick={() => {
                                                this.deacivateEdit();
                                                if (property == "Warranty") {
                                                    console.log("Waranty Unedited");
                                                    setwarranty(null)
                                                } else if (property == "Acquisition Date") {
                                                    console.log("Acquisition Unedited");
                                                    setacquisition(null)
                                                } else if (property == "Expiration Date") {
                                                    console.log("Expiration Unedited");
                                                    setexpiration(null);
                                                }
                                            }}
                                        ></CloseIcon>
                                    </InputRightElement>
                                    <Input onChange={(e) => {
                                        if (property == "Warranty") {
                                            console.log("Waranty modified", e.target.value);
                                            setwarranty(e.target.value)
                                        } else if (property == "Acquisition Date") {
                                            console.log("Acquisition Date modified", e.target.value);
                                            setacquisition(e.target.value)
                                        } else if (property == "Expiration Date") {
                                            console.log("Expiration Date modified", e.target.value);
                                            setexpiration(e.target.value);
                                        }


                                    }} type="date"></Input>
                                </InputGroup>
                            ) : Ddown.includes(property) ? (
                                <SearchSel
                                    data={data}
                                    propertyName={propertyName}
                                    fetchdat={fetchdat}
                                    setSelect={setSelect}
                                    isSelect={isSelect}
                                    setValue={setValue}
                                    valueD={valueD}
                                    isDrop={isDrop}
                                    mode={mode}
                                    setModEdit={this.deacivateEdit}
                                ></SearchSel>

                                // <></>
                            ) : (
                                <SearchSel
                                    setValue={setdetails}
                                    valueD={details}
                                    mode={mode}
                                    setModEdit={this.deacivateEdit}
                                ></SearchSel>
                            )
                        ) : (
                            <Text
                                fontWeight={editable.includes(property) && "black"}
                                color={editable.includes(property) && "black"}
                                flex={1}
                                textAlign={"right"}
                            >
                                {detail}
                                {editable.includes(property) && (
                                    <EditIcon
                                        w={8}
                                        onClick={() => {
                                            this.activateEdit();
                                        }}
                                        style={editable.includes(property) && { cursor: "pointer" }}
                                    ></EditIcon>
                                )}
                            </Text>
                        )}
                    </Box>
                </Flex >
            </Box >
        )
    }
}