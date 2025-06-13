import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, ScrollView, Button, useColorScheme } from 'react-native';
import Header from './Header'; // make sure this is a React Native component
import SidebarComp from './Sidebar'; // same here
import AlertMsg from './AlertMsg'; // this will need to be reimplemented for RN
import Modal from './Modal'; // custom modal component
import { PopoverUI, usePopover } from './Popover'; // hypothetical popover hook
import { launchMicroApp } from '../Common/CommonFunctions'; // This function must be RN-compatible

const NativeBaseScreen = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [showSideBar, setShowSideBar] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const lastActivityTime = useRef(Date.now());
  const intervalRef = useRef<any>(null);

  const { showPopover, hidePopover } = usePopover();

  const [alertData, setAlertData] = useState({
    AlertType: '',
    AlertDesc: '',
    Btns: [],
    isOpen: false,
  });

  const showAlert = useCallback(({ AlertType, AlertDesc, Btns }) => {
    setAlertData({
      AlertType,
      AlertDesc,
      Btns,
      isOpen: true,
    });
  }, []);

  const [modalData, setModalData] = useState({
    ModalTitle: '',
    ModalChildren: null,
    Btns: [],
    isOpen: false,
    closeBtn: false,
  });

  useEffect(() => {
    // Replace with RN-compatible global management if needed
    // You could use a global context instead of window.* assignment
    launchMicroApp('login', 'LoginPage', 'BaseScreenID');
  }, []);

  return (
    <View className="flex-1 bg-white dark:bg-black">
      {showHeader && <Header />}

      <View className="flex-1 flex-row">
        {showSideBar && <SidebarComp />}
        <ScrollView className="flex-1 p-4">
          {/* Your dynamic content here */}
        </ScrollView>
      </View>

      <AlertMsg
        AlertType={alertData.AlertType}
        AlertDesc={alertData.AlertDesc}
        Btns={alertData.Btns}
        isOpen={alertData.isOpen}
        setIsOpen={(val) => setAlertData((prev) => ({ ...prev, isOpen: val }))}
      />

      <Modal
        isOpen={modalData.isOpen}
        title={modalData.ModalTitle}
        Btns={modalData.Btns}
        closeBtn={modalData.closeBtn}
      >
        {modalData.ModalChildren}
      </Modal>

      <PopoverUI />

      <Button title={`Toggle ${isDark ? 'Light' : 'Dark'} Mode`} onPress={() => setIsDark(!isDark)} />
    </View>
  );
};

export default NativeBaseScreen;
