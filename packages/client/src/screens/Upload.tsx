import { Picker } from '@react-native-community/picker';
import * as DocumentPicker from 'expo-document-picker';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Platform, TextInput, View, ScrollView } from 'react-native';
import { useTheme, ActivityIndicator } from 'react-native-paper';

import Button from '../components/Button';
import CenterContainer from '../components/CenterContainer';
import Text from '../components/Text';
import { fontSizes, fontFamilies } from '../constant/theme';
import { uploadFile } from '../utils/file';
import request from '../utils/request';

export default function Upload() {
  const { colors } = useTheme();
  const [answers, setAnswers] = useState([{ answer: '' }]);
  const [themes, setThemes] = useState<{ title: string; id: number }[]>([]);
  const [selectedTheme, setSelectedTheme] = useState(1);
  const [document, setDocument] = useState<DocumentPicker.DocumentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [description, setDescripion] = useState('');
  const [errors, setErrors] = useState<{ message: string; rule: string }[]>([]);

  async function selectSound() {
    const document = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      type: 'audio/mpeg',
      multiple: false,
    });
    setDocument(document);
  }

  function updateAnswer(text: string, idAnswer: number) {
    answers[idAnswer].answer = text;
    setAnswers(answers);
  }

  function addAnswer() {
    const moreAnswers = [...answers, { answer: '' }];
    setAnswers(moreAnswers);
  }

  async function sendSound() {
    if (!document) return;
    setErrors([]);
    setLoading(true);
    try {
      await uploadFile(document, answers, selectedTheme, description);
      setAnswers([{ answer: '' }]);
      setDocument(null);
      setErrors([
        {
          rule: 'Success',
          message: 'Ajout effectué avec succès, votre son va être étudié par un membre du staff !',
        },
      ]);
    } catch (e) {
      if (e.lenght > 0) setErrors(e);
      else setErrors([{ rule: 'API error', message: "Impossible de contacter l'API" }]);
    }
    setLoading(false);
  }

  useEffect(() => {
    request('themes')
      .then((response: { title: string; id: number }[]) => {
        setThemes(response);
        setSelectedTheme(response[0].id);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <CenterContainer>
      <ScrollView style={{ width: '100%' }}>
        <View style={styles.formPart}>
          <Text fontFamily="medium" fontSize="xl" style={styles.title}>
            Son à ajouter:
          </Text>
          <Button onPress={selectSound} style={styles.button}>
            {document && document.type === 'success' ? document.name : 'Selectioner un son'}
          </Button>
          <Text fontFamily="regular" fontSize="sm">
            - Le son doit faire moins de 15sec !{'\n'}- Il doit être au format mp3{'\n'}- Il doit
            faire moins de 1mb
          </Text>
        </View>

        <View style={styles.formPart}>
          <Text fontFamily="medium" fontSize="xl" style={styles.title}>
            Catégorie:
          </Text>
          <Picker
            selectedValue={selectedTheme}
            style={{
              height: 50,
              width: 200,
              backgroundColor: colors.text,
              color: colors.primary,
            }}
            onValueChange={(itemValue) => setSelectedTheme(itemValue as number)}>
            {themes.map((theme) => (
              <Picker.Item
                key={theme.title}
                label={theme.title.toLocaleUpperCase()}
                value={theme.id}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.formPart}>
          <Text fontFamily="medium" fontSize="xl" style={styles.title}>
            Réponse(s):
          </Text>
          {answers.map((answer, index) => (
            <TextInput
              key={index}
              style={[styles.answers, { backgroundColor: colors.text }]}
              placeholder={`Réponse ${index + 1}`}
              onChange={(data) => updateAnswer(data.nativeEvent.text, index)}
            />
          ))}

          <Button style={[styles.more, { backgroundColor: colors.primary }]} onPress={addAnswer}>
            <Text fontFamily="regular" fontSize="md">
              Ajouter des réponses
            </Text>
          </Button>
        </View>
        <View style={styles.formPart}>
          <Text fontFamily="medium" fontSize="xl" style={styles.title}>
            Description:
          </Text>
          <TextInput
            style={[styles.desciption, { backgroundColor: colors.text }]}
            placeholder={`Nom de la vidéo/Épisode... d'ou vient le son`}
            onChange={(data) => setDescripion(data.nativeEvent.text)}
            multiline
            numberOfLines={4}
          />
        </View>
        <View style={styles.errors}>
          {errors.map((error) => (
            <Text fontFamily="medium" fontSize="sm" key={error.rule}>
              {error.message}
            </Text>
          ))}
        </View>
        <View style={styles.formPart}>
          {loading ? (
            <ActivityIndicator focusable color={colors.text} />
          ) : (
            <Button onPress={sendSound} style={styles.button}>
              Envoyer
            </Button>
          )}
        </View>
      </ScrollView>
    </CenterContainer>
  );
}

const styles = StyleSheet.create({
  errors: {
    alignItems: 'center',
  },
  formPart: {
    alignItems: 'center',
    padding: 10,
  },
  title: {
    padding: 4,
  },
  more: {
    borderColor: '#FFF',
    borderWidth: 2,
  },
  button: {
    borderRadius: 20,
    margin: 4,
    height: 50,
    justifyContent: 'center',
  },
  answers: {
    borderRadius: 20,
    width: 300,
    ...(Platform.OS === 'web' && { outlineWidth: 0 }),
    textAlign: 'center',
    height: 50,
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.lg,
    margin: 4,
  },
  desciption: {
    borderRadius: 20,
    width: 300,
    ...(Platform.OS === 'web' && { outlineWidth: 0 }),
    textAlign: 'center',
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.lg,
    margin: 4,
  },
});
