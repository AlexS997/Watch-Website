import { useState } from 'react'
import {categoriesHomeStyles} from '../assets/dummyStyles'
import brands from '../assets/CategoriesHomedata'
import {Link} from 'react-router-dom'

const CategoriesHome = () => {

    const [hoverBrand, setHoverBrand] = useState(null)

  return (
    <section className={categoriesHomeStyles.section}>
        <div className={categoriesHomeStyles.container}>
            <header className={categoriesHomeStyles.header} style={categoriesHomeStyles.playfairFont}>
                <h1 className={categoriesHomeStyles.h1} style={categoriesHomeStyles.h1FontSize}>
                    <span className={categoriesHomeStyles.h1SpanRegular}>
                        Premium Watch
                    </span>

                    <span className={categoriesHomeStyles.h1SpanAccent}>
                        Brands
                    </span>
                </h1>

                <div className={categoriesHomeStyles.underline}></div>

                <p className={categoriesHomeStyles.subtext}>
                    Discover the world's most prestigious picks, curated for every style
                </p>
            </header>

            <div className={categoriesHomeStyles.grid} style={categoriesHomeStyles.playfairFont}>
                {brands.map((val) => (
                    <Link key={val.id} to={val.link} className={categoriesHomeStyles.cardLink} onMouseEnter={() => setHoverBrand(val.id)} onMouseLeave={() => setHoverBrand(null)}>
                        <div className={categoriesHomeStyles.cardWrapper}>
                            <div className={categoriesHomeStyles.imageContainer}>
                                <img src={val.image} alt={val.name} className={categoriesHomeStyles.image} loading='lazy' />
                            </div>

                            <div className={categoriesHomeStyles.cardContent}>
                                <h3 className={`${categoriesHomeStyles.cardTitleBase} ${hoverBrand === val.id ? categoriesHomeStyles.cardTitleHover : categoriesHomeStyles.cardTitleNormal}`}>
                                    {val.name}
                                </h3>

                                {val.slug ? (
                                    <p className={categoriesHomeStyles.cardTagline}>
                                        {val.slug}
                                    </p>
                                ) : null}
                            </div>

                            <span className={categoriesHomeStyles.focusRing} />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </section>
  )
}

export default CategoriesHome