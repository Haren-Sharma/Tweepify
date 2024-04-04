import { Image, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { TweetType } from "@/types";
import { Entypo } from "@expo/vector-icons";
type TweetProps = {
  tweet: TweetType;
};
export default function Tweet({ tweet }: TweetProps) {
  return (
    <View style={styles.container}>
      <Image src={tweet.user.image} style={styles.userImg} />
      <View style={styles.mainContainer}>
        <View style={styles.row}>
          <Text style={styles.user_name}>{tweet.user.name}</Text>
          <Text style={styles.hr}> {tweet.user.username}</Text>
          <Text style={styles.hr}>
            .{new Date(tweet.createdAt).getHours()}h{" "}
          </Text>
          <Entypo
            name="dots-three-horizontal"
            color="gray"
            style={{ marginLeft: "auto" }}
          />
          {/*imp trick:margin:auto will lay maximum margin*/}
        </View>
        <Text style={styles.content}>{tweet.content}</Text>
        {tweet.image && <Image style={styles.optionalImg} src={tweet.image} />}
        <View style={styles.btnContainer}>
            
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  mainContainer: {
    flex: 1,
    marginLeft: 10,
  },
  user_name: {
    fontWeight: "bold",
  },
  optionalImg: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginTop: 10,
    borderRadius: 15,
  },
  content: {
    lineHeight: 20,
    marginTop: 5,
  },
  hr: {
    color: "gray",
  },
  btnContainer:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:10,
  }
});
