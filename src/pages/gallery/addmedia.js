import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import styles from '../../assets/styles/module.css/Gallery.module.css';
import { AppPages } from '../../components/navigation/page_links';

const AddMedia = ({all_gallery}) => {
  const [galleryInfo, setgalleryInfo] = useState(14);

  useEffect(()=>{
    setgalleryInfo(all_gallery)
  },[all_gallery])

  const [images, setImages] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const maxUploads = 6;
  
    if (files.length > maxUploads) {
      alert(`You can upload a maximum of ${maxUploads} images.`);
      return;
    }
  
    const newImages = Array.from(files).map((file) => {
      return {
        id: images.length + 1,
        image: URL.createObjectURL(file),
        description: '',
      };
    });
  
    setImages([...images, ...newImages]);
  };
  

  const handleDescriptionChange = (event, index) => {
    const updatedImages = [...images];
    updatedImages[index].description = event.target.value;
    setImages(updatedImages);
  };

  const handleAddMedia = () => {
    if (images.length === 0) {
      alert('Please upload at least one image.');
      return;
    }
  
    // Check if the number of images exceeds the limit
    if (images.length > 6) {
      alert('You can upload a maximum of 6 images.');
      return;
    }
  
    // Push the uploaded images to the array on successful upload
    // Example: You can replace this with your desired logic to store the images
    const uploadedImages = [...images];
  
    // Clear the uploaded images and show success message
    setImages([]);
    setSuccessMessage(`${uploadedImages.length} images uploaded successfully.`);
  
    // Redirect to MediaView page after successful upload
    router.push('/Gallery/MediaView');
  };
  

  const clearButtonRef = useRef(null);
  useEffect(() => {
    const clearButton = clearButtonRef.current;
    const inputs = document.getElementsByTagName('input');
    clearButton.addEventListener('click', function () {
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
      }
    });
    return () => {
      clearButton.removeEventListener('click', function () {
        for (let i = 0; i < inputs.length; i++) {
          inputs[i].value = '';
        }
      });
    };
  }, []);
  return (
    <section id={styles.Gallery}>
      <div id={styles.AddMedia}>
        <nav>
          <article>
            {AppPages.find((page) => page.name === 'MediaView') && (
              <a href={AppPages.find((page) => page.name === 'MediaView').path}>
                <button className={styles.back}>
                  <i className="fa fa-arrow-left"></i>
                </button>
              </a>
            )}
          </article>
          <aside>
            <button className={styles.clear} type="button" ref={clearButtonRef}>
              Clear
            </button>
          </aside>
        </nav>
        <section>
          <h3>Add Media</h3>
          <div className={styles.upload_media}>
            <div>
              <p>Upload the images. You can select up to 6.</p>
              <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
            </div>
            <div className={styles['upload_item']}>
              {images.map((image, index) => (
                <div className={styles.image_container} key={image.id}>
                  <img src={image.image} alt="" />
                  <textarea
                  placeholder="Add description"
                  value={image.description}
                  onChange={(event) => handleDescriptionChange(event, index)}
                ></textarea>
              </div>
            ))}
          </div>
        </div>
        <button onClick={handleAddMedia} disabled={images.length >= 6}>
          Add Images
        </button>
        {successMessage && <div className={styles.success_message}>{successMessage}</div>}
      </section>
    </div>
  </section>

  );
};

export default AddMedia;
