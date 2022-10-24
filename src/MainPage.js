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
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

/*
() = complete

Local storage for:
  guesses ()
  stats
    Win% ()
    Played ()
    Max Streak ()
    Current Streak ()
    The stats (3 times, 7 times...) ()
*/

const MainPage = () => {
  const toast = useToast();
  const ATTEMPTS = 7;

  // localStorage.clear();

  const [enabled, setEnabled] = useState(true);

  const [lastWin, setLastWin] = useState("---");
  const [todaysGuesses, setTodaysGuesses] = useState("---");
  const [guesses, setGuesses] = useState("---");
  const [gamesWon, setGamesWon] = useState("---");
  const [currentStreak, setCurrentStreak] = useState("---");
  const [maxStreak, setMaxStreak] = useState("---");
  const [averageGuesses, setAverageGuesses] = useState("---");

  const [text, setText] = useState("");
  const [attempts, setAttempts] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  let n = false;

  // if (localStorage.getItem("recentDate") == today) {
  //   n = true;
  // } else {
  //   n = false;
  // }

  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure({ defaultIsOpen: n });

  const arr = [["orange", require("./assets/images/orange.png")]];

  // Used for reference for future words
  const initialDate = "10/24/2022";

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  function parseDate(str) {
    var mdy = str.split("/");
    return new Date(mdy[2], mdy[0] - 1, mdy[1]);
  }

  function datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }

  const INDEX = datediff(parseDate(initialDate), parseDate(today));
  while (true) {
    if (INDEX >= arr.length) {
      INDEX -= arr.length;
    } else {
      break;
    }
  }

  const ann = [];
  const [arro, setArro] = useState(ann);
  const [completed, setCompleted] = useState(false);

  const IMG = arr[INDEX][1];

  const ShowWin = () => {
    setEnabled(false);
    setCompleted(true);
    toast({
      title: '🎉 Congrats, the word was "' + arr[INDEX][0] + '" 🎉',
      status: "success",
      duration: 1000000000,
      position: "top",
      isClosable: true,
    });
    setText(arr[INDEX][0]);
  };

  const ShowLoss = () => {
    setEnabled(false);
    setCompleted(true);
    toast({
      title: "🤔 " + arr[INDEX][0] + " 🤔",
      status: "info",
      duration: 1000000000,
      position: "top",
      isClosable: true,
    });
    setText(arr[INDEX][0]);
  };

  const Win = () => {
    setEnabled(false);
    setCompleted(true);
    toast({
      title: '🎉 Congrats, the word was "' + arr[INDEX][0] + '" 🎉',
      status: "success",
      duration: 1000000000,
      position: "top",
      isClosable: true,
    });
    setText(arr[INDEX][0]);

    //console.log(today);
    localStorage.setItem("recentDate", today);
    console.log(localStorage.getItem("recentDate"));

    if (localStorage.getItem("win") !== null) {
      let wins = JSON.parse(localStorage.getItem("win"));
      wins.push(1);
      localStorage.setItem("win", JSON.stringify(wins));
    } else {
      let wins = [];
      wins.push(1);
      localStorage.setItem("win", JSON.stringify(wins));
    }
    console.log(localStorage.getItem("win"));

    if (localStorage.getItem("streak") !== null) {
      let streak = JSON.parse(localStorage.getItem("streak"));
      streak.push(today);
      localStorage.setItem("streak", JSON.stringify(streak));
    } else {
      let streak = [];
      streak.push(today);
      localStorage.setItem("streak", JSON.stringify(streak));
    }
    console.log(localStorage.getItem("streak"));

    if (localStorage.getItem("guesses") !== null) {
      let guesses = JSON.parse(localStorage.getItem("guesses"));
      guesses.push(attempts);
      localStorage.setItem("guesses", JSON.stringify(guesses));
    } else {
      let guesses = [];
      guesses.push(attempts);
      localStorage.setItem("guesses", JSON.stringify(guesses));
    }
    console.log(JSON.parse(localStorage.getItem("guesses")));

    if (localStorage.getItem("dates") !== null) {
      let dates = JSON.parse(localStorage.getItem("dates"));
      dates.push(today);
      localStorage.setItem("dates", JSON.stringify(dates));
    } else {
      let dates = [];
      dates.push(today);
      localStorage.setItem("dates", JSON.stringify(dates));
    }
    console.log(localStorage.getItem("dates"));

    setData();
    onOpen2();
  };

  const Loss = () => {
    setEnabled(false);
    setCompleted(true);
    toast({
      title: "🤔 " + arr[INDEX][0] + " 🤔",
      status: "info",
      duration: 1000000000,
      position: "top",
      isClosable: true,
    });
    setText(arr[INDEX][0]);

    localStorage.setItem(today, "recentDate");
    console.log(localStorage.getItem("recentDate"));

    if (localStorage.getItem("win") !== null) {
      let wins = JSON.parse(localStorage.getItem("win"));
      wins.push(0);
      localStorage.setItem("win", JSON.stringify(wins));
    } else {
      let wins = [];
      wins.push(0);
      localStorage.setItem("win", JSON.stringify(wins));
    }
    console.log(localStorage.getItem("win"));

    if (localStorage.getItem("guesses") !== null) {
      let guesses = JSON.parse(localStorage.getItem("guesses"));
      guesses.push(attempts);
      localStorage.setItem("guesses", JSON.stringify(guesses));
    } else {
      let guesses = [];
      guesses.push(attempts);
      localStorage.setItem("guesses", JSON.stringify(guesses));
    }
    console.log(localStorage.getItem("guesses"));

    if (localStorage.getItem("dates") !== null) {
      let dates = JSON.parse(localStorage.getItem("dates"));
      dates.push(today);
      localStorage.setItem("dates", JSON.stringify(dates));
    } else {
      let dates = [];
      dates.push(today);
      localStorage.setItem("dates", JSON.stringify(dates));
    }
    console.log(localStorage.getItem("dates"));

    setData();
    onOpen2();
  };

  const startAttempts = () => {
    setAttempts((prev) => prev + 1);
    setArro((prev) => [...prev, text.toLowerCase()]);

    //PROBLEM HERE: for some reason skipping one in the beginning
    console.log(arro.length);

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;

    let guessesNames = [today];
    for (var i = 0; i < arro.length; i++) {
      guessesNames.push(arro[i]);
    }
    localStorage.setItem("guessesNames", JSON.stringify(guessesNames));

    setText("");
    if (text == arr[INDEX][0]) {
      Win();
    }
    if (attempts >= ATTEMPTS - 1) {
      Loss();
    }
  };

  const setData = () => {
    let recentDate = localStorage.getItem("recentDate");
    let wins = JSON.parse(localStorage.getItem("win"));
    let guesses = JSON.parse(localStorage.getItem("guesses"));
    let streak = JSON.parse(localStorage.getItem("streak"));
    let dates = JSON.parse(localStorage.getItem("dates"));

    console.log(wins);
    console.log(recentDate);
    console.log(guesses);
    console.log(streak);
    console.log(dates);

    if (localStorage.getItem("win") === null) {
      return;
    }

    if (wins.includes(1)) {
      for (var i = wins.length - 1; i >= 0; i--) {
        if (wins[i] == 1) {
          setLastWin("" + dates[i]);
          break;
        }
      }
    } else {
      setLastWin("---");
    }

    if ((recentDate = today)) {
      setTodaysGuesses("" + guesses[guesses.length - 1]);
    } else {
      setTodaysGuesses("---");
    }

    let won = 0;
    if (wins.includes(1)) {
      for (var i = wins.length - 1; i >= 0; i--) {
        if (wins[i] == 1) {
          won++;
        }
      }
      setGamesWon("" + won);
    } else {
      setGamesWon("---");
    }

    let currStreak = 0;
    if (streak !== null) {
      if (streak[streak.length - 1] == today) {
        currStreak = 1;
        for (var i = streak.length - 1; i >= 0; i--) {
          if (
            i != 0 &&
            datediff(parseDate(streak[i - 1]), parseDate(streak[i])) == 1
          ) {
            currStreak++;
          }
        }
        setCurrentStreak("" + currStreak);
      }
    }

    let maxStreak = 0;
    let curr = 0;
    if (streak !== null && streak.length > 0) {
      curr = 1;
      for (var i = streak.length - 1; i >= 0; i--) {
        if (
          i != 0 &&
          datediff(parseDate(streak[i - 1]), parseDate(streak[i])) == 1
        ) {
          curr++;
        } else {
          if (curr > maxStreak) {
            maxStreak = curr;
            curr = 1;
          }
        }
      }
      setMaxStreak(maxStreak);
    }

    let totguess = 0;
    for (var i = 0; i < guesses.length; i++) {
      totguess += guesses[i];
    }
    setAverageGuesses(totguess / guesses.length);
  };

  useEffect(() => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;

    console.log(
      "First " +
        (localStorage.getItem("guessesNames") === null
          ? "is null"
          : JSON.parse(localStorage.getItem("guessesNames")))
    );
    // console.log("Second " + today);

    if (
      localStorage.getItem("guessesNames") !== null &&
      JSON.parse(localStorage.getItem("guessesNames"))[0] == today
    ) {
      for (
        var i = 1;
        i < JSON.parse(localStorage.getItem("guessesNames")).length;
        i++
      ) {
        arro.push(JSON.parse(localStorage.getItem("guessesNames"))[i]);
      }
      console.log(arro);
      setAttempts(arro.length);
    }

    if (localStorage.getItem("recentDate") !== null) {
      if (today == localStorage.getItem("recentDate")) {
        let guesses = JSON.parse(localStorage.getItem("guesses"));
        setCompleted(true);
        setText(arr[INDEX][0]);
        setEnabled(false);
        setAttempts(guesses[guesses.length - 1]);
        setData();
        onOpen2();

        let win = JSON.parse(localStorage.getItem("win"));
        if (win[win.length - 1] == 1) {
          toast({
            title: '🎉 Congrats, the word was "' + arr[INDEX][0] + '" 🎉',
            status: "success",
            duration: 1000000000,
            position: "top",
            isClosable: true,
          });
        } else {
          toast({
            title: "🤔 " + arr[INDEX][0] + " 🤔",
            status: "info",
            duration: 1000000000,
            position: "top",
            isClosable: true,
          });
        }
      }
    }
  }, []);

  const rows = [];
  for (let i = 0; i < arro.length; i++) {
    //console.log(arro);
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
                <Text>Guess the thing in 7 guesses or less!</Text>
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

      <Modal isOpen={isOpen2} onClose={onClose2}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Statistics</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction={"column"} alignItems={"center"} width={"100%"}>
              <Flex
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                width={"100%"}
                borderBottom={"1px solid gray"}
                padding={"1.5vh"}
              >
                <Text fontWeight={500} fontSize={"1.5vw"}>
                  Last Win:&nbsp;
                </Text>
                <Text fontWeight={500} fontSize={"1.5vw"}>
                  {lastWin}
                </Text>
              </Flex>
              <Flex
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                width={"100%"}
                borderBottom={"1px solid gray"}
                padding={"1.5vh"}
              >
                <Text fontWeight={500} fontSize={"1.5vw"}>
                  Today's guesses:&nbsp;
                </Text>
                <Text fontWeight={500} fontSize={"1.5vw"}>
                  {todaysGuesses}
                </Text>
              </Flex>
              <Flex
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                width={"100%"}
                borderBottom={"1px solid gray"}
                padding={"1.5vh"}
              >
                <Text fontWeight={500} fontSize={"1.5vw"}>
                  Games won:&nbsp;
                </Text>
                <Text fontWeight={500} fontSize={"1.5vw"}>
                  {gamesWon}
                </Text>
              </Flex>
              <Flex
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                width={"100%"}
                borderBottom={"1px solid gray"}
                padding={"1.5vh"}
              >
                <Text fontWeight={500} fontSize={"1.5vw"}>
                  Current streak:&nbsp;
                </Text>
                <Text fontWeight={500} fontSize={"1.5vw"}>
                  {currentStreak}
                </Text>
              </Flex>
              <Flex
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                width={"100%"}
                borderBottom={"1px solid gray"}
                padding={"1.5vh"}
              >
                <Text fontWeight={500} fontSize={"1.5vw"}>
                  Max streak:&nbsp;
                </Text>
                <Text fontWeight={500} fontSize={"1.5vw"}>
                  {maxStreak}
                </Text>
              </Flex>
              <Flex
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                width={"100%"}
                borderBottom={"1px solid gray"}
                padding={"1.5vh"}
              >
                <Text fontWeight={500} fontSize={"1.5vw"}>
                  Average guesses:&nbsp;
                </Text>
                <Text fontWeight={500} fontSize={"1.5vw"}>
                  {averageGuesses}
                </Text>
              </Flex>
              <Flex
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                marginTop={"1.5vh"}
                marginBottom={"1.5vh"}
                gap={"1vw"}
              >
                <Button colorScheme="blue" mr={3}>
                  Share
                </Button>
                <Link
                  href="https://www.buymeacoffee.com/bensloutskY"
                  target={"_blank"}
                  variant={"ghost"}
                >
                  Donate
                </Link>
              </Flex>
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
        <Button
          onClick={() => {
            setData();
            onOpen2();
          }}
          background={"transparent"}
        >
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
          {attempts >= 1 || completed ? (
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
          ) : (
            <Square size="5vw" bg="#cdcdcd" />
          )}
          {attempts >= 2 || completed ? (
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
          ) : (
            <Square size="5vw" bg="#cdcdcd" />
          )}
          {attempts >= 3 || completed ? (
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
          ) : (
            <Square size="5vw" bg="#cdcdcd" />
          )}
        </Flex>
        <Flex
          direction={"row"}
          gap={"0.25vw"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {attempts >= 4 || completed ? (
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
          ) : (
            <Square size="5vw" bg="#cdcdcd" />
          )}
          {attempts >= 5 || completed ? (
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
          ) : (
            <Square size="5vw" bg="#cdcdcd" />
          )}
          {attempts >= 6 || completed ? (
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
          ) : (
            <Square size="5vw" bg="#cdcdcd" />
          )}
        </Flex>
        <Flex
          direction={"row"}
          gap={"0.25vw"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {completed ? (
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
          ) : (
            <Square size="5vw" bg="#cdcdcd" />
          )}
          {attempts >= 7 || completed ? (
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
          ) : (
            <Square size="5vw" bg="#cdcdcd" />
          )}
          {completed ? (
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
          ) : (
            <Square size="5vw" bg="#cdcdcd" />
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
            {attempts}/{ATTEMPTS}
          </Text>
        </Flex>
        {rows}
      </Flex>
    </Flex>
  );
};

export default MainPage;
