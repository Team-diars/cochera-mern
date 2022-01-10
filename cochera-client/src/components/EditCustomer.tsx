import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import React, {LegacyRef, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSelectedContext } from '../context/PopupContext'
import { RootState } from '../state'
import { addCustomer, updateCustomer } from '../state/action-creators'
import { CustomerState, Payload } from '../state/actions/customer'
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function getBase64(file: Blob | undefined) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    }
  });
}

interface IProps {
  initialRef: LegacyRef<HTMLInputElement>,
  finalRef: React.RefObject<HTMLHeadingElement>,
  isOpen: boolean,
  onClose: () => void,
}
interface UploadState {
  previewVisible: boolean,
  previewImage: string,
  previewTitle: string,
  fileList: Array<{uid?: string, percent?:number, name?: string, status?: string, url?: string}>
}
export const EditCustomer: React.FC<IProps> = ({initialRef, finalRef, isOpen, onClose}) => {
  const state: CustomerState = useSelector((state: RootState) => state.customers);
  const [formData, setFormData] = useState<Payload>({
    id: "",
    fullname: "",
    address: "",
    cellphone: "",
    cars: [],
    date: new Date,
  })
  const {fullname, address, cellphone} = formData;
  const [uploadImage, setUploadImage] = useState<UploadState>({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-2',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-3',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-4',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-xxx',
        percent: 50,
        name: 'image.png',
        status: 'uploading',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-5',
        name: 'image.png',
        status: 'error',
      },
    ],
  });
  const {fileList,previewVisible,previewImage,previewTitle} = uploadImage;
  const handleCancel = () => {
    const {previewVisible, ...rest} = uploadImage
    setUploadImage({
      previewVisible:false,
      ...rest
    })
  }
  const onChange = (e: any) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }
  const dispatch = useDispatch();
  const {contextActions: {setIsOpen, setIdSelected}, contextState: {isOpen: isEditPopupOpen}} = useSelectedContext();
  const editCustomer = (formData: Payload) => {
    if(!formData.id) return;
    dispatch(updateCustomer(formData));
    onClosePopup();
  }
  const onClosePopup = () => {
    setIsOpen(false);
    setIdSelected(null);    
    onClose();
  }
  const handleChange = (fileListParam: Array<{uid?: string, percent?:number, name?: string, status?: string, url?: string}>): void => {
    const {fileList, ...rest} = uploadImage
    setUploadImage({
      fileList: fileListParam,
      ...rest
    })
  }
  const handlePreview = async(file: {uid?: string, percent?:number, name?: string, status?: string, url?: string, preview?: Promise<unknown | undefined>, originFileObj?: Blob}) => {
    if (!file.url && !file.preview) {
      if (await getBase64(file.originFileObj) != undefined){
        // file.preview = await getBase64(file.originFileObj);
      }
    }
  }
  useEffect(() => {
    console.log("state.customer: ",state.customer);
    if(!state.loading){
      setFormData({
        id: state.customer?.id || "",
        fullname: state.customer?.fullname || "",
        address: state.customer?.address || "",
        cellphone: state.customer?.cellphone || "",
        cars: state.customer?.cars || [],
        date: state.customer?.date || new Date,
      })
    }
  },[state.customer])
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Modal finalFocusRef={finalRef} isOpen={true} onClose={onClosePopup}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Cliente</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Nombre Completo</FormLabel>
              <Input ref={initialRef} placeholder='Nombre Completo' name="fullname" onChange={(e) => onChange(e)} value={fullname}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Telefono</FormLabel>
              <Input placeholder='Telefono' name="cellphone" onChange={(e) => onChange(e)} value={cellphone}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Direccion</FormLabel>
              <Input placeholder='Direccion' name="address" onChange={(e) => onChange(e)} value={address}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Autos</FormLabel>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                // fileList={fileList}
                // onPreview={handlePreview}
                // onChange={handleChange}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
            </FormControl>

          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClosePopup}>
              Cerrar
            </Button>
            <Button variant='ghost' onClick={(e) => editCustomer(formData)}>Guardar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
