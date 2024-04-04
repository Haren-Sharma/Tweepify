import { Image, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
export default function Tweet({tweet}:any) {
  return (
    <View style={styles.container}>
      <Image src={tweet.user.image} style={styles.userImg}/>
      <View style={styles.mainContainer}>
      <Text style={styles.user_name}>{tweet.user.name}</Text>
      <Text style={styles.content}>{tweet.content}</Text>
      <Image resizeMode="contain" style={styles.optionalImg} src={tweet.image}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection:'row',
    padding:10,
    borderBottomWidth:1,
    borderBottomColor:'lightgray'
  },
  userImg:{
    width:50,
    height:50,
    borderRadius:50
  },
  mainContainer:{
    flex:1,
    marginLeft:10,
  },
  user_name:{
    fontWeight:"bold"
  },
  optionalImg:{
    // width:'100%',
    // aspectRatio:3/4
  },
  content:{
    lineHeight:20,
    marginTop:5
  }
});
