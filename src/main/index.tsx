import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {
  AuthorizationPermissions,
  FitnessDataType,
  FitnessTracker,
  GoogleFitDataType,
  HealthKitDataType,
} from '@kilohealth/rn-fitness-tracker';

const permissions: AuthorizationPermissions = {
  healthReadPermissions: [HealthKitDataType.StepCount],
  googleFitReadPermissions: [GoogleFitDataType.Steps],
};

const Main = () => {
  const [authorized, setAuthorized] = useState(false);
  console.log('authorized==>>', authorized);
  const [stepsToday, setStepsToday] = useState<any>(undefined);
  console.log('stepsToday==>>', stepsToday);

  const authorize = async () => {
    await FitnessTracker.authorize(permissions);

    setAuthorized(true);
  };

  const getStepsToday = async () => {
    const steps = await FitnessTracker.getStatisticTodayTotal(
      FitnessDataType.Steps,
    );
    setStepsToday(steps);
    console.log('steps==>>', steps);
  };

  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.ButtonContainer} onPress={authorize}>
        <Text style={styles.buttonText}>Set Authorized</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.ButtonContainer} onPress={getStepsToday}>
        <Text style={styles.buttonText}>GetStepsToday</Text>
      </TouchableOpacity>
      <Text style={styles.setpText}>Steps Today : {stepsToday}</Text>
    </SafeAreaView>
  );
};

export default Main;
