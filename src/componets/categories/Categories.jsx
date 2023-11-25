const Categories = ({ value, categoryHandler }) => {
  const categories = [
    'Все', 
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ]

  return (
    <div className="categories">
      <ul className="categories__list">
        {
          categories.map((categoryName, i) => {
            const activeClass = value === i ? "active" : "";
            return (
              <li
                key={i}
                onClick={() => categoryHandler(i)}
                className={`categories__item ${activeClass}`}
              >
                {categoryName}
              </li>
            );
          })
        }
        
      </ul>
    </div>
  )
}

export default Categories;
