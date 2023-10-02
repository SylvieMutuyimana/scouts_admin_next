import styles from '../../assets/styles/module.css/Gallery.module.css';
import { useState, useEffect } from 'react';
import { AppPages } from '../../components/navigation/page_links';

const MediaView = ({all_gallery}) => {
  const [numPictures, setNumPictures] = useState(14);
  const [galleryInfo, setgalleryInfo] = useState(14);

  useEffect(()=>{
    setgalleryInfo(all_gallery)
  },[all_gallery])

  console.log('all_gallery: ', all_gallery)
  console.log('galleryInfo: ', galleryInfo)

  const maxPictures = (galleryInfo && galleryInfo.length>0)? galleryInfo.length : 1;

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const num_picsInput = document.getElementById('num_pics');
    const num = Number(num_picsInput.value);
    if (isNaN(num) || num < 1 || num > maxPictures) {
      // Show error message if input is invalid
      alert(`Please enter a number between 1 and ${maxPictures}`);
    } else {
      // Update state with the number of pictures to show
      setNumPictures(num);
    }
  };

  const handleShowAll = () => {
    setNumPictures(maxPictures);
  };

  const handleShowLess = () => {
    setNumPictures(3);
  };

  return (
    <section id={styles.Gallery}>
      <div id={styles.MediaView}>
        <nav>
          <article>
            <label htmlFor="num_pics">Show</label>
            <form onSubmit={handleFormSubmit}>
              <input
                type="number"
                id="num_pics"
                name="num_pics"
                min="1"
                max={maxPictures}
                value={numPictures}
              />
              <button type="submit">Preview</button>
            </form>
          </article>
          <aside>
            <button className={styles.show} onClick={handleShowAll}>
              Show All
            </button>
            <button className={styles.show} onClick={handleShowLess}>
              Show Less
            </button>
            {AppPages.find((page) => page.name === 'AddMedia') && (
              <a href={AppPages.find((page) => page.name === 'AddMedia').path}>
                <button>
                  <i className="material-icons">add</i> Add media
                </button>
              </a>
            )}
          </aside>
        </nav>
        <section>
          <div className={styles.media}>
            {galleryInfo && galleryInfo.length>0 && galleryInfo.slice(0, numPictures).map((item) => (
              <div key={item.id} className={styles.gallery_item}>
                <img src={item.image} alt={`Gallery item ${item.id}`} />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default MediaView;
