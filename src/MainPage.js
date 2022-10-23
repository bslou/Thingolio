import {
  Flex,
  Image,
  Input,
  Square,
  Text,
  Button,
  useToast,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

/*
Local storage for:
  guesses
  stats
    Win%
    Played
    Max Streak
    Current Streak
    The stats (3 times, 8 times...)
*/

const MainPage = () => {
  const [enabled, setEnabled] = useState(true);
  const [date, setDate] = useState("");
  const [guesses, setGuesses] = useState("");
  const [text, setText] = useState("");
  const [attempts, setAttempts] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const ann = [];
  const [arro, setArro] = useState(ann);

  const startAttempts = () => {
    if (attempts < 8) {
      setAttempts((prev) => prev + 1);
      setArro((prev) => [...prev, text.toLowerCase()]);
      setText("");
      if (attempts >= 7) {
        setEnabled(false);
      }
    }
  };

  const rows = [];
  for (let i = 0; i < arro.length; i++) {
    console.log(arro);
    rows.push(
      <Flex
        marginBottom={"0.3vh"}
        width={"20vw"}
        background={"#cdcdcd"}
        padding={"0.2vw"}
        alignItems={"center"}
        justifyContent={"center"}
        borderRadius={2}
      >
        <Text fontFamily={"monospace"} fontSize={"1.2vw"}>
          {arro[i]}
        </Text>
      </Flex>
    );
  }

  const arr = [["orange", require("./assets/images/orange.png")]];

  const IMG = arr[0][1];

  return (
    <Flex direction={"column"} alignItems={"center"}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>How to Play</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction={"column"} alignItems={"center"} width={"100%"}>
              <Flex
                direction={"column"}
                width={"100%"}
                alignItems={"flex-start"}
              >
                <Text>Guess the thing in 6 guesses or less!</Text>
                <Text>
                  Each time you make a guess it will reveal another portion of
                  the thing.
                </Text>
                <Text marginTop={"3vh"} fontSize={"1.6vw"}>
                  Example:
                </Text>
              </Flex>
              <Image
                src={require("./assets/Example.png")}
                alt="Example"
                width={"18vw"}
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Flex
        direction={"row"}
        alignItems={"center"}
        gap={"1vw"}
        justifyContent={"center"}
      >
        <Button background={"transparent"} onClick={onOpen}>
          <Image src={require("./assets/Help.png")} alt="help" />
        </Button>
        <Text fontSize={"4vw"} fontFamily={"monospace"}>
          THINGOLIO
        </Text>
        <Button background={"transparent"}>
          <Image src={require("./assets/Leaderboard.png")} alt="leaderboard" />
        </Button>
      </Flex>
      <Flex
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"0.25vw"}
      >
        <Flex
          direction={"row"}
          gap={"0.25vw"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {attempts < 1 ? (
            <Square size="5vw" bg="#cdcdcd" />
          ) : (
            <Flex
              direction={"row"}
              justifyContent={"flex-start"}
              width={"5vw"}
              height={"5vw"}
              overflow={"hidden"}
            >
              <Image
                src={IMG}
                alt={"orange"}
                minWidth={"14vw"}
                minHeight={"14vw"}
              />
            </Flex>
          )}
          {attempts < 2 ? (
            <Square size="5vw" bg="#cdcdcd" />
          ) : (
            <Flex
              direction={"row"}
              justifyContent={"center"}
              width={"5vw"}
              height={"5vw"}
              overflow={"hidden"}
            >
              <Image
                src={IMG}
                alt={"orange"}
                minWidth={"14vw"}
                minHeight={"14vw"}
              />
            </Flex>
          )}
          {attempts < 3 ? (
            <Square size="5vw" bg="#cdcdcd" />
          ) : (
            <Flex
              direction={"row"}
              justifyContent={"flex-end"}
              width={"5vw"}
              height={"5vw"}
              overflow={"hidden"}
            >
              <Image
                src={IMG}
                alt={"orange"}
                minWidth={"14vw"}
                minHeight={"14vw"}
              />
            </Flex>
          )}
        </Flex>
        <Flex
          direction={"row"}
          gap={"0.25vw"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {attempts < 4 ? (
            <Square size="5vw" bg="#cdcdcd" />
          ) : (
            <Flex
              direction={"row"}
              justifyContent={"flex-start"}
              alignItems={"center"}
              width={"5vw"}
              height={"5vw"}
              overflow={"hidden"}
            >
              <Image
                src={IMG}
                alt={"orange"}
                minWidth={"14vw"}
                minHeight={"14vw"}
              />
            </Flex>
          )}
          {attempts < 5 ? (
            <Square size="5vw" bg="#cdcdcd" />
          ) : (
            <Flex
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              width={"5vw"}
              height={"5vw"}
              overflow={"hidden"}
            >
              <Image
                src={IMG}
                alt={"orange"}
                minWidth={"14vw"}
                minHeight={"14vw"}
              />
            </Flex>
          )}
          {attempts < 6 ? (
            <Square size="5vw" bg="#cdcdcd" />
          ) : (
            <Flex
              direction={"row"}
              justifyContent={"flex-end"}
              alignItems={"center"}
              width={"5vw"}
              height={"5vw"}
              overflow={"hidden"}
            >
              <Image
                src={IMG}
                alt={"orange"}
                minWidth={"14vw"}
                minHeight={"14vw"}
              />
            </Flex>
          )}
        </Flex>
        <Flex
          direction={"row"}
          gap={"0.25vw"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {attempts < 7 ? (
            <Square size="5vw" bg="#cdcdcd" />
          ) : (
            <Flex
              direction={"row"}
              justifyContent={"flex-start"}
              alignItems={"flex-end"}
              width={"5vw"}
              height={"5vw"}
              overflow={"hidden"}
            >
              <Image
                src={IMG}
                alt={"orange"}
                minWidth={"14vw"}
                minHeight={"14vw"}
              />
            </Flex>
          )}
          {attempts < 8 ? (
            <Square size="5vw" bg="#cdcdcd" />
          ) : (
            <Flex
              direction={"row"}
              justifyContent={"center"}
              alignItems={"flex-end"}
              width={"5vw"}
              height={"5vw"}
              overflow={"hidden"}
            >
              <Image
                src={IMG}
                alt={"orange"}
                minWidth={"14vw"}
                minHeight={"14vw"}
              />
            </Flex>
          )}
          {attempts < 9 ? (
            <Square size="5vw" bg="#cdcdcd" />
          ) : (
            <Flex
              direction={"row"}
              justifyContent={"flex-end"}
              alignItems={"flex-end"}
              width={"5vw"}
              height={"5vw"}
              overflow={"hidden"}
            >
              <Image
                src={IMG}
                alt={"orange"}
                minWidth={"14vw"}
                minHeight={"14vw"}
              />
            </Flex>
          )}
        </Flex>
      </Flex>
      <Input
        autoFocus
        marginTop={"3vh"}
        marginBottom={"3vh"}
        width={"17vw"}
        fontSize={"1.3vw"}
        paddingTop={"1.7vw"}
        paddingBottom={"1.7vw"}
        paddingRight={"2vw"}
        placeholder={"Guess the Object!"}
        fontFamily={"monospace"}
        disabled={!enabled}
        value={text}
        onChange={(e) => {
          let value = e.target.value;

          value = value.replace(/[^A-Za-z]/gi, "");

          setText(value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (text == "") {
              return;
            }
            startAttempts();
          }
        }}
      />
      <Flex
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Flex
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          marginBottom={"2vh"}
        >
          <Text fontSize={"2vw"} fontFamily={"monospace"}>
            Attempts:&nbsp;
          </Text>
          <Text fontWeight={600} fontSize={"2vw"} fontFamily={"monospace"}>
            {attempts}/8
          </Text>
        </Flex>
        {rows}
      </Flex>
    </Flex>
  );
};

export default MainPage;
