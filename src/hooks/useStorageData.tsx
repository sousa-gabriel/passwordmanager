import React, { ReactNode, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface StorageDataProps {
    children: ReactNode;
}

interface NewRegister {
    id: string;
    title: string;
    email: string;
    password: string;
}

interface IStorageDataContext {
    insertRegister(formDara: NewRegister): Promise<void>;
    SearchRegister(): Promise<string>;
}

const StorageDataContext = createContext({} as IStorageDataContext);

function StorageData({ children }: StorageDataProps) {

    const userStorgeKey = '@passmanager:logins';

    async function insertRegister(newLoginData: NewRegister) {
        
        try {
            const response = await AsyncStorage.getItem(userStorgeKey);
            const responseCurrent = response ? JSON.parse(response) : [];
            
            const responseformatted = [
                ...responseCurrent,
                newLoginData
            ]

            await AsyncStorage.setItem(userStorgeKey, JSON.stringify(responseformatted))

        } catch (error) {            
            throw new Error(error);
        }

    }

    async function SearchRegister() {        
        const response = await AsyncStorage.getItem(userStorgeKey);
        
        if(!response) {
          return '';
        }

        return response;
    }

    return (
        <StorageDataContext.Provider value={{ insertRegister, SearchRegister }}>
            {children}
        </StorageDataContext.Provider>
    )
}

function useStorageData() {
    const context = useContext(StorageDataContext)
    return context;
}

export { StorageData, useStorageData }