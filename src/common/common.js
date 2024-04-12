export const ROLES = Object.freeze({
  MANUFACTURER: "manufacturer",
  CUSTOMER: "customer",
});

export const ROLES_RUS = {
  [ROLES.MANUFACTURER]: "Производитель",
  [ROLES.CUSTOMER]: "Заказчик",
};

export const POINT_TYPES = Object.freeze({
  WAREHOUSE: "warehouse",
  PICKUP_POINT: "pickup_point",
});

export const POINT_TYPES_RUS = {
  [POINT_TYPES.WAREHOUSE]: "Склад",
  [POINT_TYPES.PICKUP_POINT]: "Пункт выдачи",
};

export const PATH_TYPES = Object.freeze({
  AUTOMOBILE: "automobile",
  RAILWAY: "railway",
  SEA: "sea",
  RIVER: "river",
  AIR: "air",
});

export const PATH_TYPES_RUS = {
  [PATH_TYPES.AUTOMOBILE]: "Автомобильный",
  [PATH_TYPES.RAILWAY]: "Железнодорожный",
  [PATH_TYPES.SEA]: "Морской",
  [PATH_TYPES.RIVER]: "Речной",
  [PATH_TYPES.AIR]: "Воздушный",
};

export const TYPE_PATH_TO_EMOJI = {
  [PATH_TYPES.AUTOMOBILE]: "🚘",
  [PATH_TYPES.RAILWAY]: "🚂",
  [PATH_TYPES.SEA]: "🚢",
  [PATH_TYPES.AIR]: "🛩️",
  [PATH_TYPES.RIVER]: "🚤",
};

export const GRID_DEFAULT_LOCALE_TEXT_RUS = {
  // Root
  noRowsLabel: 'Нет строк',
  noResultsOverlayLabel: 'Результаты не найдены.',

  // Density selector toolbar button text
  toolbarDensity: 'Плотность',
  toolbarDensityLabel: 'Плотность',
  toolbarDensityCompact: 'Компактный',
  toolbarDensityStandard: 'Стандартный',
  toolbarDensityComfortable: 'Комфортный',

  // Columns selector toolbar button text
  toolbarColumns: 'Колонки',
  toolbarColumnsLabel: 'Выбрать колонки',

  // Filters toolbar button text
  toolbarFilters: 'Фильтры',
  toolbarFiltersLabel: 'Показать фильтры',
  toolbarFiltersTooltipHide: 'Скрыть фильтры',
  toolbarFiltersTooltipShow: 'Показать фильтры',
  toolbarFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} активных фильтров` : `${count} активный фильтр`,

  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Поиск…',
  toolbarQuickFilterLabel: 'Поиск',
  toolbarQuickFilterDeleteIconLabel: 'Очистить',

  // Export selector toolbar button text
  toolbarExport: 'Экспорт',
  toolbarExportLabel: 'Экспорт',
  toolbarExportCSV: 'Скачать как CSV',
  toolbarExportPrint: 'Печать',
  toolbarExportExcel: 'Скачать как Excel',

  // Columns management text
  columnsManagementSearchTitle: 'Поиск',
  columnsManagementNoColumns: 'Нет колонок',
  columnsManagementShowHideAllText: 'Показать/Скрыть все',

  // Filter panel text
  filterPanelAddFilter: 'Добавить фильтр',
  filterPanelRemoveAll: 'Удалить все',
  filterPanelDeleteIconLabel: 'Удалить',
  filterPanelLogicOperator: 'Логический оператор',
  filterPanelOperator: 'Оператор',
  filterPanelOperatorAnd: 'И',
  filterPanelOperatorOr: 'Или',
  filterPanelColumns: 'Колонки',
  filterPanelInputLabel: 'Значение',
  filterPanelInputPlaceholder: 'Значение фильтра',

  // Filter operators text
  filterOperatorContains: 'содержит',
  filterOperatorEquals: 'равно',
  filterOperatorStartsWith: 'начинается с',
  filterOperatorEndsWith: 'заканчивается на',
  filterOperatorIs: 'равно',
  filterOperatorNot: 'не равно',
  filterOperatorAfter: 'после',
  filterOperatorOnOrAfter: 'на или после',
  filterOperatorBefore: 'до',
  filterOperatorOnOrBefore: 'на или до',
  filterOperatorIsEmpty: 'пусто',
  filterOperatorIsNotEmpty: 'не пусто',
  filterOperatorIsAnyOf: 'любое из',
  'filterOperator=': '=',
  'filterOperator!=': '!=',
  'filterOperator>': '>',
  'filterOperator>=': '>=',
  'filterOperator<': '<',
  'filterOperator<=': '<=',

  // Filter values text
  filterValueAny: 'любое',
  filterValueTrue: 'да',
  filterValueFalse: 'нет',

  // Column menu text
  columnMenuLabel: 'Меню',
  columnMenuShowColumns: 'Показать колонки',
  columnMenuManageColumns: 'Управление колонками',
  columnMenuFilter: 'Фильтр',
  columnMenuHideColumn: 'Скрыть колонку',
  columnMenuUnsort: 'Сбросить сортировку',
  columnMenuSortAsc: 'Сортировать по возрастанию',
  columnMenuSortDesc: 'Сортировать по убыванию',

  // Column header text
  columnHeaderFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} активных фильтров` : `${count} активный фильтр`,
  columnHeaderFiltersLabel: 'Показать фильтры',
  columnHeaderSortIconLabel: 'Сортировка',

  // Rows selected footer text
  footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} строк выбрано`
      : `${count.toLocaleString()} строка выбрана`,

  // Total row amount footer text
  footerTotalRows: 'Всего строк:',

  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} из ${totalCount.toLocaleString()}`,

  // Checkbox selection text
  checkboxSelectionHeaderName: 'Выбор чекбоксом',
  checkboxSelectionSelectAllRows: 'Выбрать все строки',
  checkboxSelectionUnselectAllRows: 'Снять выделение со всех строк',
  checkboxSelectionSelectRow: 'Выбрать строку',
  checkboxSelectionUnselectRow: 'Снять выделение со строки',

  // Boolean cell text
  booleanCellTrueLabel: 'да',
  booleanCellFalseLabel: 'нет',

  // Actions cell more text
  actionsCellMore: 'еще',

  // Column pinning text
  pinToLeft: 'Закрепить слева',
  pinToRight: 'Закрепить справа',
  unpin: 'Открепить',

  // Tree Data
  treeDataGroupingHeaderName: 'Группа',
  treeDataExpand: 'показать детей',
  treeDataCollapse: 'скрыть детей',

  // Grouping columns
  groupingColumnHeaderName: 'Группа',
  groupColumn: (name) => `Группировать по ${name}`,
  unGroupColumn: (name) => `Прекратить группировку по ${name}`,

  // Master/detail
  detailPanelToggle: 'Переключить панель деталей',
  expandDetailPanel: 'Развернуть',
  collapseDetailPanel: 'Свернуть',

  // Used core components translation keys
  MuiTablePagination: {},

  // Row reordering text
  rowReorderingHeaderName: 'Перемещение строк',

  // Aggregation
  aggregationMenuItemHeader: 'Агрегация',
  aggregationFunctionLabelSum: 'сумма',
  aggregationFunctionLabelAvg: 'среднее',
  aggregationFunctionLabelMin: 'минимум',
  aggregationFunctionLabelMax: 'максимум',
  aggregationFunctionLabelSize: 'размер',
};
