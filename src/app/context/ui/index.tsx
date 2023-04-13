import { AlertProps } from '@mui/material/Alert';
import { SwipeableDrawerProps } from '@mui/material/SwipeableDrawer';
import { ISidebarItem } from 'app/types/sidebar';
import queryString from 'query-string';
import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { useHistory } from 'react-router';
import { EDrawerType, EModalType, ESidebarExpandVariant } from './enum';

interface IFeedbackComponent<T> {
  open: boolean;
  type: T | null;
  props: any | null;
}

interface IAlertState {
  open: boolean;
  status: AlertProps['color'] | null;
  message: string;
}

type TAlertActions = 'success' | 'info' | 'warning' | 'error';

interface UIState {
  modal: IFeedbackComponent<EModalType>;
  drawer: IFeedbackComponent<EDrawerType> & {
    position: SwipeableDrawerProps['anchor'] | null;
  };
  alert: IAlertState;
  sidebarActive: ISidebarItem | null;
  sidebarExpandKey: string | null;
  listDense: boolean;
  sidebarExpandVariant: ESidebarExpandVariant | null;
  setSidebarActive: Dispatch<SetStateAction<ISidebarItem | null>>;
  setSidebarExpandKey: Dispatch<SetStateAction<string | null>>;
  setListDense: Dispatch<SetStateAction<boolean>>;
  setSidebarExpandVariant: Dispatch<SetStateAction<ESidebarExpandVariant | null>>;
  openModal: (type: EModalType, props?: object) => void;
  closeModal: () => void;
  openDrawer: (type: EDrawerType, position: SwipeableDrawerProps['anchor'], props?: object) => void;
  closeDrawer: () => void;
  checkOpen: (variant: 'modal' | 'drawer', type: EModalType | EDrawerType) => boolean;
  setAlert: (act: TAlertActions, message: string) => void;
  clearAlert: () => void;
}

const UIContext = createContext<UIState>({
  modal: {
    open: false,
    type: null,
    props: null,
  },
  drawer: {
    open: false,
    position: null,
    type: null,
    props: null,
  },
  alert: {
    open: false,
    status: null,
    message: '',
  },
  sidebarActive: null,
  sidebarExpandKey: null,
  listDense: false,
  sidebarExpandVariant: null,
  setSidebarActive: () => {},
  setSidebarExpandKey: () => {},
  setListDense: () => {},
  setSidebarExpandVariant: () => {},
  openModal: () => {},
  closeModal: () => {},
  openDrawer: () => {},
  closeDrawer: () => {},
  checkOpen: () => false,
  setAlert: () => {},
  clearAlert: () => {},
});

function isModalType(type: any): type is EModalType {
  if (Object.values(EModalType).includes(type)) {
    return true;
  }

  return false;
}

function isDrawerType(type: any): type is EDrawerType {
  if (Object.values(EDrawerType).includes(type)) {
    return true;
  }

  return false;
}

function isDrawerPosition(position: any): position is SwipeableDrawerProps['anchor'] {
  const anchors = ['left', 'top', 'right', 'bottom'];
  if (anchors.includes(position)) {
    return true;
  }

  return false;
}

function isSidebarExpandVariant(variant: any): variant is ESidebarExpandVariant {
  const variants = [ESidebarExpandVariant.EXPAND_LESS, ESidebarExpandVariant.EXPAND_MORE];

  if (variants.includes(variant)) {
    return true;
  }

  return false;
}

export const UIProvider: React.FC = ({ children }) => {
  const history = useHistory();
  const [sidebarActive, setSidebarActive] = useState<ISidebarItem | null>(null);
  const [sidebarExpandKey, setSidebarExpandKey] = useState<string | null>(null);
  const [listDense, setListDense] = useState(true);
  const [sidebarExpandVariant, setSidebarExpandVariant] = useState<ESidebarExpandVariant | null>(() => {
    const locationSearch = history.location.search;
    const queryObject = queryString.parse(locationSearch);

    const expandVariant = isSidebarExpandVariant(queryObject.sidebarExpandVariant)
      ? queryObject.sidebarExpandVariant
      : ESidebarExpandVariant.EXPAND_MORE;
    return expandVariant;
  });
  const [modal, setModal] = useState<IFeedbackComponent<EModalType>>(() => {
    const locationSearch = history.location.search;
    const queryObject = queryString.parse(locationSearch);

    const open = queryObject && queryObject.modalType ? true : false;
    const type: EModalType | null = isModalType(queryObject.modalType) ? queryObject.modalType : null;
    const props =
      queryObject && queryObject.modalProps && typeof queryObject.modalProps === 'object'
        ? queryObject.modalProps
        : null;

    return { open, type, props };
  });
  const [drawer, setDrawer] = useState<
    IFeedbackComponent<EDrawerType> & {
      position: SwipeableDrawerProps['anchor'] | null;
    }
  >(() => {
    const locationSearch = history.location.search;
    const queryObject = queryString.parse(locationSearch);

    const open = queryObject && queryObject.drawerType ? true : false;
    const type = isDrawerType(queryObject.drawerType) ? queryObject.drawerType : null;
    const position = isDrawerPosition(queryObject.drawerPosition) ? queryObject.drawerPosition : 'left';
    const props =
      queryObject && queryObject.modalProps && typeof queryObject.modalProps === 'object'
        ? queryObject.modalProps
        : null;

    return { open, type, props, position };
  });
  const [alert, setAlert] = useState<IAlertState>({
    open: false,
    status: null,
    message: '',
  });

  const openModal = (modalType: EModalType, modalProps?: object) => {
    setModal({
      open: true,
      type: modalType,
      props: modalProps ? modalProps : null,
    });
    const search = queryString.stringify({
      modalType: modalType,
      modalProps,
    });
    history.push({ search });
  };
  const closeModal = () => {
    setModal({
      open: false,
      type: null,
      props: null,
    });
    const locationSearch = history.location.search;
    const queryObject = queryString.parse(locationSearch);
    delete queryObject.modalType;
    delete queryObject.modalProps;

    history.push({ search: queryString.stringify(queryObject) });
  };

  const openDrawer = (
    drawerType: EDrawerType,
    position: SwipeableDrawerProps['anchor'] = 'left',
    drawerProps?: object,
  ) => {
    setDrawer((prev) => ({
      open: true,
      type: drawerType,
      props: drawerProps ? drawerProps : null,
      position,
    }));
    const search = queryString.stringify({
      drawerType,
      drawerProps,
      drawerPosition: position,
    });
    history.push({ search });
  };
  const closeDrawer = () => {
    setDrawer({
      open: false,
      type: null,
      props: null,
      position: drawer.position,
    });

    const locationSearch = history.location.search;
    const queryObject = queryString.parse(locationSearch);
    delete queryObject.drawerType;
    delete queryObject.drawerProps;
    delete queryObject.drawerPosition;

    history.push({ search: queryString.stringify(queryObject) });
  };

  const checkOpen = (variant: 'modal' | 'drawer', type: EModalType | EDrawerType): boolean => {
    if (variant === 'modal' && (type as EModalType)) {
      return modal.type === type;
    }
    if (variant === 'drawer' && (type as EDrawerType)) {
      return drawer.type === type;
    }

    return false;
  };

  const handleSetAlert = (act: TAlertActions, message: string) => {
    setAlert({
      open: true,
      status: act,
      message,
    });
  };

  const handleClearAlert = () => {
    setAlert({
      open: false,
      status: null,
      message: '',
    });
  };

  return (
    <UIContext.Provider
      value={{
        modal,
        alert,
        drawer,
        sidebarActive,
        sidebarExpandKey,
        listDense,
        sidebarExpandVariant,
        setSidebarActive,
        setSidebarExpandKey,
        setListDense,
        setSidebarExpandVariant,
        openModal,
        closeModal,
        openDrawer,
        closeDrawer,
        checkOpen,
        setAlert: handleSetAlert,
        clearAlert: handleClearAlert,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export default UIContext;
