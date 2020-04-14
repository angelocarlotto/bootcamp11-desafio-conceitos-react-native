import React,{useState, useEffect} from "react";
import api from './services/api';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
} from "react-native";

export default function App() {
const [repositories,setRepositories]=useState([]);
  useEffect(()=>{
    api.get('repositories').then(e=>{
      setRepositories(e.data);
    });
  },[])

  async function handleLikeRepository(id) {
    const {data:newRepository}=await api.post(`repositories/${id}/like`);
    const index=repositories.findIndex(e=>e.id===id);
   // if(response.status>=200 && PanResponder.status<300){
      setRepositories(
        repositories.map((repository) =>
          repository.id === id ? newRepository : repository
        )
      );
    //}
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>

        <FlatList
        data={repositories}
        style={styles.repositoryContainer}
        keyExtractor={e=>e.id}
        renderItem={({item:repository})=>(
          <>
              <Text style={styles.repository}>{repository.title}</Text>

<FlatList 
data={repository.techs}
style={styles.techsContainer}
keyExtractor={e=>e.id}
renderItem={({item:tech})=>(
  <>
<Text style={styles.tech}>
{tech}
                </Text>
  </>)}
/>
              

              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                  testID={`repository-likes-${repository.id}`}
                >
                  {repository.likes} curtidas
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(repository.id)}
                // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                testID={`like-button-${repository.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
          </>
        )}
        />


      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
