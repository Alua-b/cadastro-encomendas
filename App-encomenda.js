import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function App() {
  const [clientName, setClientName] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [deliveryTime, setDeliveryTime] = useState(new Date());
  const [orders, setOrders] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const items = ['Pães', 'Bolo', 'Salgados', 'Doces', 'Sanduíches Naturais', 'Refrigerantes'];

  const addOrder = () => {
    if (!clientName || !selectedItem || !quantity) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }

    setOrders((prevOrders) => [
      ...prevOrders,
      {
        id: Math.random().toString(),
        clientName,
        item: selectedItem,
        quantity,
        deliveryDate: deliveryDate.toLocaleDateString(),
        deliveryTime: deliveryTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);

    // Limpar campos
    setClientName('');
    setSelectedItem('');
    setQuantity('');
    setDeliveryDate(new Date());
    setDeliveryTime(new Date());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controle de Encomendas</Text>

      {/* Nome do Cliente */}
      <Text style={styles.label}>Nome do Cliente:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do cliente"
        value={clientName}
        onChangeText={(text) => setClientName(text)}
      />

      {/* Seleção de Itens */}
      <Text style={styles.label}>Item:</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setModalVisible(true)}
      >
        <Text>{selectedItem || 'Selecione um item'}</Text>
      </TouchableOpacity>

      {/* Modal para seleção dos itens */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione um Item</Text>
            {items.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.modalItem}
                onPress={() => {
                  setSelectedItem(item);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalText}>{item}</Text>
              </TouchableOpacity>
            ))}
            <Button title="Fechar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Quantidade */}
      <Text style={styles.label}>Quantidade:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a quantidade"
        keyboardType="numeric"
        value={quantity}
        onChangeText={(text) => setQuantity(text)}
      />

      {/* Data de Entrega */}
      <Text style={styles.label}>Data de Entrega:</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>{deliveryDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={deliveryDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setDeliveryDate(selectedDate);
            }
          }}
        />
      )}

      {/* Horário de Entrega */}
      <Text style={styles.label}>Horário de Entrega:</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowTimePicker(true)}
      >
        <Text>
          {deliveryTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={deliveryTime}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) {
              setDeliveryTime(selectedTime);
            }
          }}
        />
      )}

      {/* Botão para adicionar encomenda */}
      <Button title="Adicionar Encomenda" onPress={addOrder} />

      {/* Lista de Encomendas */}
      <Text style={styles.label}>Encomendas:</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text>Cliente: {item.clientName}</Text>
            <Text>Item: {item.item}</Text>
            <Text>Quantidade: {item.quantity}</Text>
            <Text>Data de Entrega: {item.deliveryDate}</Text>
            <Text>Horário de Entrega: {item.deliveryTime}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
  },
  orderItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
