import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Select,
  MenuItem as MuiMenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import FiberNewRoundedIcon from '@mui/icons-material/FiberNewRounded';
import PageHeader from 'components/common/PageHeader';
import AppModal, { ModalCancelBtn, ModalSubmitBtn } from 'components/common/AppModal';
import ToggleSwitch from 'components/common/ToggleSwitch';
import {
  MENU_CATEGORIES,
  type MenuCategoryData,
  type MenuItemData,
  type PricingType,
} from 'data/menuData';
import {
  getPricingTypes,
  getActivePricingTypes,
  addPricingType,
  updatePricingType,
  deletePricingType,
  canDeletePricingType,
  type CustomPricingType,
  type PricingTypeOption,
} from 'data/pricingTypes';

// Pricing type labels for UI
const PRICING_TYPE_LABELS: Record<PricingType, string> = {
  single: 'Single Price',
  half_full: 'Half / Full',
  size: 'Size (e.g., 6 inch / 9 inch)',
  quantity: 'Quantity (e.g., 5 pcs / 8 pcs)',
  custom: 'Custom',
};

// Default pricing configs
const DEFAULT_PRICING_CONFIG: Record<PricingType, { options?: string[]; labels?: string[] }> = {
  single: {},
  half_full: { labels: ['Half', 'Full'] },
  size: { options: ['6 inch', '9 inch'], labels: ['6 inch', '9 inch'] },
  quantity: { options: ['5 pcs', '8 pcs'], labels: ['5 pcs', '8 pcs'] },
  custom: {},
};

interface CategoryState extends MenuCategoryData {
  isLive: boolean;
  showOnGuestMenu: boolean;
}
interface ItemState extends MenuItemData {
  isLive: boolean;
}

const buildInitCats = (): CategoryState[] =>
  MENU_CATEGORIES.map(c => ({ ...c, isLive: true, showOnGuestMenu: true }));
const buildInitItems = (): Map<number, ItemState[]> => {
  const m = new Map<number, ItemState[]>();
  MENU_CATEGORIES.forEach(c =>
    m.set(
      c.id,
      c.items.map(i => ({ ...i, isLive: true }))
    )
  );
  return m;
};

const hSx = {
  fontSize: 10,
  fontWeight: 700,
  color: '#999',
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  borderBottom: '1px solid #eae7e2',
  py: 1.5,
  fontFamily: 'Inter, sans-serif',
};
const cSx = { borderBottom: '1px solid #eae7e2', py: 1.8, fontFamily: 'Inter, sans-serif' };
const inputSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    bgcolor: '#faf9f7',
    fontSize: 14,
    fontFamily: 'Inter, sans-serif',
    '& fieldset': { borderColor: '#e8e4de' },
    '&:hover fieldset': { borderColor: '#c86030' },
    '&.Mui-focused fieldset': { borderColor: '#c86030', borderWidth: 1.5 },
  },
  '& .MuiInputLabel-root': { fontFamily: 'Inter, sans-serif', fontSize: 13.5 },
  '& .MuiInputLabel-root.Mui-focused': { color: '#c86030' },
};

function EmptyState({ message }: { message: string }) {
  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <RestaurantMenuIcon sx={{ fontSize: 40, color: '#ddd', mb: 1.5 }} />
      <Typography sx={{ fontSize: 15, color: '#999', fontFamily: 'Inter, sans-serif' }}>
        {message}
      </Typography>
    </Box>
  );
}

function Toast({ msg }: { msg: string }) {
  if (!msg) return null;
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 80,
        right: 24,
        zIndex: 9999,
        bgcolor: '#1a1a1a',
        color: '#fff',
        px: 3,
        py: 1.5,
        borderRadius: '12px',
        fontSize: 14,
        fontFamily: 'Inter, sans-serif',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
      }}
    >
      {msg}
    </Box>
  );
}

export default function MenuPage() {
  const [categories, setCategories] = useState<CategoryState[]>(buildInitCats);
  const [itemsMap, setItemsMap] = useState<Map<number, ItemState[]>>(buildInitItems);
  const [viewCat, setViewCat] = useState<CategoryState | null>(null);
  const [search, setSearch] = useState('');
  const [addItemOpen, setAddItemOpen] = useState(false);
  const [editItem, setEditItem] = useState<ItemState | null>(null);
  const [selectedCatForItem, setSelectedCatForItem] = useState<CategoryState | null>(null);
  const [addCatOpen, setAddCatOpen] = useState(false);
  const [editCat, setEditCat] = useState<CategoryState | null>(null);
  const [toast, setToast] = useState('');
  const [itemForm, setItemForm] = useState({
    name: '',
    price1: '',
    price2: '',
    isLive: true,
    isNewLaunch: false,
    isBestSeller: false,
  });
  const [catForm, setCatForm] = useState({
    name: '',
    image: '',
    pricingType: 'single' as PricingType,
    isNewLaunch: false,
    showOnGuestMenu: true,
  });

  // Pricing Types Management State
  const [pricingTypesOpen, setPricingTypesOpen] = useState(false);
  const [pricingTypes, setPricingTypes] = useState<CustomPricingType[]>(getActivePricingTypes);
  const [editPricingType, setEditPricingType] = useState<CustomPricingType | null>(null);
  const [pricingTypeForm, setPricingTypeForm] = useState({
    name: '',
    description: '',
    option1Label: '',
    option2Label: '',
  });
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  // Category CRUD
  const getPricingTypeFromCat = (c: MenuCategoryData): PricingType => {
    if (c.pricingType) return c.pricingType;
    // Legacy fallback
    if (c.hasHalfFull) return 'half_full';
    return 'single';
  };

  const openAddCat = () => {
    setCatForm({
      name: '',
      image: '',
      pricingType: 'single',
      isNewLaunch: false,
      showOnGuestMenu: true,
    });
    setEditCat(null);
    setAddCatOpen(true);
  };

  const openEditCat = (cat: CategoryState) => {
    setCatForm({
      name: cat.name,
      image: cat.image,
      pricingType: getPricingTypeFromCat(cat),
      isNewLaunch: !!cat.isNewLaunch,
      showOnGuestMenu: cat.showOnGuestMenu,
    });
    setEditCat(cat);
    setAddCatOpen(true);
  };

  // Pricing Types Management Functions
  const openPricingTypesManager = () => {
    setPricingTypes(getActivePricingTypes());
    setPricingTypesOpen(true);
  };

  const openAddPricingType = () => {
    setPricingTypeForm({ name: '', description: '', option1Label: '', option2Label: '' });
    setEditPricingType(null);
  };

  const openEditPricingType = (type: CustomPricingType) => {
    setPricingTypeForm({
      name: type.name,
      description: type.description || '',
      option1Label: type.options[0]?.label || '',
      option2Label: type.options[1]?.label || '',
    });
    setEditPricingType(type);
  };

  const submitPricingType = (e: React.FormEvent) => {
    e.preventDefault();
    const options: PricingTypeOption[] = [
      { id: `opt_${Date.now()}_1`, label: pricingTypeForm.option1Label, value: 'option1' },
      { id: `opt_${Date.now()}_2`, label: pricingTypeForm.option2Label, value: 'option2' },
    ];

    if (editPricingType) {
      updatePricingType(editPricingType.id, {
        name: pricingTypeForm.name,
        description: pricingTypeForm.description,
        options,
      });
      showToast('Pricing type updated!');
    } else {
      addPricingType({
        name: pricingTypeForm.name,
        description: pricingTypeForm.description,
        options,
        isActive: true,
      });
      showToast('Pricing type created!');
    }

    setPricingTypes(getActivePricingTypes());
    setEditPricingType(null);
  };

  const handleDeletePricingType = (id: string) => {
    // Check if any category is using this pricing type
    const categoriesUsingType = categories.filter(c => c.pricingType === id);

    if (categoriesUsingType.length > 0) {
      showToast(`Cannot delete: Used by ${categoriesUsingType.length} categorie(s)`);
      return;
    }

    if (deleteConfirmId === id) {
      if (deletePricingType(id)) {
        showToast('Pricing type deleted!');
        setPricingTypes(getActivePricingTypes());
      }
      setDeleteConfirmId(null);
    } else {
      setDeleteConfirmId(id);
      setTimeout(() => setDeleteConfirmId(null), 3000); // Auto-reset after 3 seconds
    }
  };

  const submitCat = (e: React.FormEvent) => {
    e.preventDefault();
    const pricingConfig = {
      type: catForm.pricingType,
      ...DEFAULT_PRICING_CONFIG[catForm.pricingType],
    };
    const halfFullLabel =
      catForm.pricingType === 'half_full'
        ? 'Half / Full'
        : catForm.pricingType === 'size'
          ? '6" / 9"'
          : catForm.pricingType === 'quantity'
            ? '5 pcs / 8 pcs'
            : undefined;

    if (editCat) {
      setCategories(p =>
        p.map(c =>
          c.id === editCat.id
            ? {
                ...c,
                name: catForm.name,
                image: catForm.image,
                pricingType: catForm.pricingType,
                pricingConfig,
                hasHalfFull: catForm.pricingType !== 'single',
                halfFullLabel,
                isNewLaunch: catForm.isNewLaunch,
                showOnGuestMenu: catForm.showOnGuestMenu,
              }
            : c
        )
      );
      showToast('Category updated!');
    } else {
      const newId = Date.now();
      setCategories(p => [
        ...p,
        {
          id: newId,
          name: catForm.name,
          image: catForm.image,
          pricingType: catForm.pricingType,
          pricingConfig,
          hasHalfFull: catForm.pricingType !== 'single',
          halfFullLabel,
          isNewLaunch: catForm.isNewLaunch,
          items: [],
          isLive: true,
          showOnGuestMenu: catForm.showOnGuestMenu,
        },
      ]);
      setItemsMap(prev => {
        const next = new Map(prev);
        next.set(newId, []);
        return next;
      });
      showToast('Category created!');
    }
    setAddCatOpen(false);
  };
  const deleteCat = (id: number) => {
    setCategories(p => p.filter(c => c.id !== id));
    setItemsMap(prev => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
    showToast('Category deleted!');
  };

  const openAddItem = () => {
    if (!viewCat) return;
    // Get fresh category data from state
    const freshCat = categories.find(c => c.id === viewCat.id) || viewCat;
    setSelectedCatForItem(freshCat);
    setItemForm({
      name: '',
      price1: '',
      price2: '',
      isLive: true,
      isNewLaunch: false,
      isBestSeller: false,
    });
    setEditItem(null);
    setAddItemOpen(true);
  };
  const openEditItem = (item: ItemState) => {
    // Get fresh category data
    const freshCategory = categories.find(c => c.id === viewCat?.id);
    const pricingType = freshCategory?.pricingType || viewCat?.pricingType || 'single';
    let p1 = '',
      p2 = '';
    if (pricingType === 'single') {
      p1 = String(item.prices?.single || item.price || '');
    } else if (pricingType === 'half_full') {
      p1 = String(item.prices?.half || item.halfPrice || '');
      p2 = String(item.prices?.full || item.price || '');
    } else {
      p1 = String(item.prices?.option1 || item.halfPrice || '');
      p2 = String(item.prices?.option2 || item.price || '');
    }
    setSelectedCatForItem(freshCategory || viewCat || null);
    setItemForm({
      name: item.name,
      price1: p1,
      price2: p2,
      isLive: item.isLive,
      isNewLaunch: !!item.isNewLaunch,
      isBestSeller: !!item.isBestSeller,
    });
    setEditItem(item);
    setAddItemOpen(true);
  };

  const submitItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!viewCat) return;
    const catId = viewCat.id;
    // Get FRESH category data from state (not stale viewCat)
    const freshCat = categories.find(c => c.id === catId);
    const pricingType = freshCat?.pricingType || viewCat.pricingType || 'single';

    setItemsMap(prev => {
      const next = new Map(prev);
      const arr = [...(next.get(catId) || [])];

      // Build prices object based on pricing type
      let prices = {};
      let price = undefined,
        halfPrice = undefined;

      if (pricingType === 'single') {
        prices = { single: Number(itemForm.price1) };
        price = Number(itemForm.price1);
      } else if (pricingType === 'half_full') {
        prices = { half: Number(itemForm.price1), full: Number(itemForm.price2) };
        halfPrice = Number(itemForm.price1);
        price = Number(itemForm.price2);
      } else {
        prices = { option1: Number(itemForm.price1), option2: Number(itemForm.price2) };
        halfPrice = Number(itemForm.price1);
        price = Number(itemForm.price2);
      }

      if (editItem) {
        const idx = arr.findIndex(i => i.id === editItem.id);
        if (idx >= 0)
          arr[idx] = {
            ...arr[idx],
            name: itemForm.name,
            prices,
            price,
            halfPrice,
            isLive: itemForm.isLive,
            isNewLaunch: itemForm.isNewLaunch,
            isBestSeller: itemForm.isBestSeller,
          };
        showToast('Item updated!');
      } else {
        arr.push({
          id: Date.now(),
          name: itemForm.name,
          prices,
          price,
          halfPrice,
          isLive: itemForm.isLive,
          isNewLaunch: itemForm.isNewLaunch,
          isBestSeller: itemForm.isBestSeller,
        });
        showToast('Item added!');
      }
      next.set(catId, arr);
      return next;
    });
    setAddItemOpen(false);
    setSelectedCatForItem(null); // Reset selected category
  };

  const deleteItem = (id: number) => {
    if (!viewCat) return;
    setItemsMap(prev => {
      const next = new Map(prev);
      next.set(
        viewCat.id,
        (next.get(viewCat.id) || []).filter(i => i.id !== id)
      );
      return next;
    });
    showToast('Item deleted!');
  };

  const filteredCats = categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  const catItems = viewCat ? itemsMap.get(viewCat.id) || [] : [];

  const addBtn = (label: string, onClick: () => void) => (
    <Button
      startIcon={<AddRoundedIcon />}
      onClick={onClick}
      sx={{
        bgcolor: '#c86030',
        color: '#fff',
        borderRadius: '20px',
        px: 2.5,
        py: 1,
        textTransform: 'none',
        fontSize: 14,
        fontFamily: 'Inter, sans-serif',
        '&:hover': { bgcolor: '#a8502a' },
      }}
    >
      {label}
    </Button>
  );

  /* ── ITEMS VIEW ── */
  if (viewCat) {
    const currentCat = categories.find(c => c.id === viewCat.id) || viewCat;
    // Use getPricingTypeFromCat to support legacy hasHalfFull fallback
    const pricingType = getPricingTypeFromCat(currentCat);

    // Get labels from pricingConfig, or halfFullLabel, or defaults
    let priceLabels: string[] = ['', ''];
    if (currentCat.pricingConfig?.labels) {
      priceLabels = currentCat.pricingConfig.labels;
    } else if (currentCat.halfFullLabel) {
      // Parse legacy halfFullLabel like "5pcs / 8pcs" or "Half / Full"
      priceLabels = currentCat.halfFullLabel.split('/').map(s => s.trim());
    } else if (pricingType === 'half_full') {
      priceLabels = ['Half', 'Full'];
    } else if (pricingType === 'size') {
      priceLabels = ['6 inch', '9 inch'];
    } else if (pricingType === 'quantity') {
      priceLabels = ['5 pcs', '8 pcs'];
    }

    return (
      <Box>
        <Toast msg={toast} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, flexWrap: 'wrap' }}>
          <IconButton
            onClick={() => setViewCat(null)}
            sx={{ bgcolor: '#fff', border: '1px solid #eae7e2', '&:hover': { bgcolor: '#f5f3ef' } }}
          >
            <ArrowBackRoundedIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontSize: 10.5,
                fontWeight: 700,
                color: '#c86030',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              MENU · {currentCat.name.toUpperCase()}
            </Typography>
            <Typography
              sx={{
                fontSize: 28,
                fontWeight: 700,
                color: '#1a1a1a',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {currentCat.name}{' '}
              <span style={{ color: '#888', fontWeight: 400, fontSize: 18 }}>
                ({catItems.length} items)
              </span>
            </Typography>
          </Box>
          {addBtn('Add Item', openAddItem)}
        </Box>
        <Box
          sx={{
            bgcolor: '#fff',
            borderRadius: '20px',
            border: '1px solid #eae7e2',
            overflow: 'hidden',
          }}
        >
          {catItems.length === 0 ? (
            <EmptyState message="No items yet. Click Add Item to get started." />
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={hSx}>Item</TableCell>
                    {pricingType !== 'single' && (
                      <TableCell sx={{ ...hSx, textAlign: 'right' }}>
                        {priceLabels[0]} (₹)
                      </TableCell>
                    )}
                    <TableCell sx={{ ...hSx, textAlign: 'right' }}>
                      {pricingType === 'single' ? 'Price (₹)' : priceLabels[1] + ' (₹)'}
                    </TableCell>
                    <TableCell sx={hSx}>Tags</TableCell>
                    <TableCell sx={hSx}>Status</TableCell>
                    <TableCell sx={hSx}>On Menu</TableCell>
                    <TableCell sx={{ ...hSx, textAlign: 'center' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {catItems.map(item => {
                    // Get prices based on pricing type
                    let price1: string | number = '—',
                      price2: string | number = '—';
                    if (pricingType === 'single') {
                      price2 = item.prices?.single || item.price || '—';
                    } else if (pricingType === 'half_full') {
                      price1 = item.prices?.half || item.halfPrice || '—';
                      price2 = item.prices?.full || item.price || '—';
                    } else {
                      price1 = item.prices?.option1 || item.halfPrice || '—';
                      price2 = item.prices?.option2 || item.price || '—';
                    }

                    return (
                      <TableRow
                        key={item.id}
                        sx={{ '&:hover': { bgcolor: '#faf9f7' }, '&:last-child td': { border: 0 } }}
                      >
                        <TableCell sx={cSx}>
                          <Typography
                            sx={{
                              fontSize: 14,
                              fontWeight: 600,
                              color: '#1a1a1a',
                              fontFamily: 'Inter, sans-serif',
                            }}
                          >
                            {item.name}
                          </Typography>
                        </TableCell>
                        {pricingType !== 'single' && (
                          <TableCell sx={{ ...cSx, textAlign: 'right' }}>
                            <Typography
                              sx={{ fontSize: 14, color: '#555', fontFamily: 'Inter, sans-serif' }}
                            >
                              {price1 !== '—' ? `₹${price1}` : '—'}
                            </Typography>
                          </TableCell>
                        )}
                        <TableCell sx={{ ...cSx, textAlign: 'right' }}>
                          <Typography
                            sx={{
                              fontSize: 14,
                              fontWeight: 700,
                              color: '#1a1a1a',
                              fontFamily: 'Inter, sans-serif',
                            }}
                          >
                            {price2 !== '—' ? `₹${price2}` : '—'}
                          </Typography>
                        </TableCell>
                        <TableCell sx={cSx}>
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            {item.isNewLaunch && (
                              <Chip
                                label="New"
                                size="small"
                                sx={{
                                  bgcolor: '#fef3f0',
                                  color: '#c86030',
                                  fontSize: 9,
                                  height: 18,
                                  fontWeight: 700,
                                }}
                              />
                            )}
                            {item.isBestSeller && (
                              <Chip
                                label="Best"
                                size="small"
                                sx={{
                                  bgcolor: '#fff8e1',
                                  color: '#e6a817',
                                  fontSize: 9,
                                  height: 18,
                                  fontWeight: 700,
                                }}
                              />
                            )}
                          </Box>
                        </TableCell>
                        <TableCell sx={cSx}>
                          <Chip
                            label={item.isLive ? 'LIVE' : 'DRAFT'}
                            size="small"
                            sx={{
                              bgcolor: item.isLive ? '#e3f0e8' : '#eeedea',
                              color: item.isLive ? '#2e7d32' : '#888',
                              fontWeight: 600,
                              fontSize: 11,
                              height: 24,
                              borderRadius: '12px',
                            }}
                          />
                        </TableCell>
                        <TableCell sx={cSx}>
                          <ToggleSwitch
                            checked={item.isLive}
                            onChange={v =>
                              setItemsMap(prev => {
                                const next = new Map(prev);
                                next.set(
                                  viewCat.id,
                                  (next.get(viewCat.id) || []).map(i =>
                                    i.id === item.id ? { ...i, isLive: v } : i
                                  )
                                );
                                return next;
                              })
                            }
                          />
                        </TableCell>
                        <TableCell sx={{ ...cSx, textAlign: 'center' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                            <IconButton
                              size="small"
                              onClick={() => openEditItem(item)}
                              sx={{
                                color: '#888',
                                '&:hover': { color: '#c86030', bgcolor: '#fef3f0' },
                              }}
                            >
                              <EditOutlinedIcon sx={{ fontSize: 17 }} />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => deleteItem(item.id)}
                              sx={{
                                color: '#888',
                                '&:hover': { color: '#c62828', bgcolor: '#fce4e4' },
                              }}
                            >
                              <DeleteOutlineRoundedIcon sx={{ fontSize: 17 }} />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
        <AppModal
          key={selectedCatForItem?.id || 'no-cat'} // Force re-render when category changes
          open={addItemOpen}
          onClose={() => {
            setAddItemOpen(false);
            setSelectedCatForItem(null);
          }}
          title={editItem ? 'Edit Item' : 'Add Item'}
          subtitle={`Category: ${selectedCatForItem?.name || viewCat?.name}`}
          actions={
            <>
              <ModalCancelBtn
                onClick={() => {
                  setAddItemOpen(false);
                  setSelectedCatForItem(null);
                }}
              />
              <ModalSubmitBtn>{editItem ? 'Update Item' : 'Create Item'}</ModalSubmitBtn>
            </>
          }
        >
          <Box
            component="form"
            onSubmit={submitItem}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, py: 1 }}
          >
            <TextField
              label="Item Name"
              required
              value={itemForm.name}
              onChange={e => setItemForm(p => ({ ...p, name: e.target.value }))}
              fullWidth
              sx={inputSx}
            />

            {/* Dynamic Price Fields based on category pricing type */}
            {(() => {
              // Use selected category or fallback to viewCat
              const cat = selectedCatForItem || viewCat;
              if (!cat) {
                return (
                  <Typography
                    sx={{ color: '#c62828', fontSize: 14, fontFamily: 'Inter, sans-serif' }}
                  >
                    Error: No category selected. Please close and try again.
                  </Typography>
                );
              }

              // Use getPricingTypeFromCat for proper legacy support
              const pricingType = getPricingTypeFromCat(cat);

              // Get labels from pricingConfig, halfFullLabel, or defaults
              let labels: string[] = ['', ''];
              if (cat.pricingConfig?.labels) {
                labels = cat.pricingConfig.labels;
              } else if (cat.halfFullLabel) {
                // Parse legacy halfFullLabel like "5pcs / 8pcs"
                labels = cat.halfFullLabel.split('/').map(s => s.trim());
              } else if (pricingType === 'half_full') {
                labels = ['Half', 'Full'];
              } else if (pricingType === 'size') {
                labels = ['6 inch', '9 inch'];
              } else if (pricingType === 'quantity') {
                labels = ['5 pcs', '8 pcs'];
              }

              if (pricingType === 'single') {
                return (
                  <TextField
                    label="Price (₹)"
                    required
                    type="number"
                    value={itemForm.price1}
                    onChange={e => setItemForm(p => ({ ...p, price1: e.target.value }))}
                    sx={inputSx}
                  />
                );
              }

              return (
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <TextField
                    label={`${labels[0]} Price (₹)`}
                    required
                    type="number"
                    value={itemForm.price1}
                    onChange={e => setItemForm(p => ({ ...p, price1: e.target.value }))}
                    sx={inputSx}
                  />
                  <TextField
                    label={`${labels[1]} Price (₹)`}
                    required
                    type="number"
                    value={itemForm.price2}
                    onChange={e => setItemForm(p => ({ ...p, price2: e.target.value }))}
                    sx={inputSx}
                  />
                </Box>
              );
            })()}

            <FormGroup row sx={{ gap: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={itemForm.isLive}
                    onChange={e => setItemForm(p => ({ ...p, isLive: e.target.checked }))}
                    sx={{ '&.Mui-checked': { color: '#c86030' } }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: 13.5, fontFamily: 'Inter, sans-serif' }}>
                    Live on menu
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={itemForm.isNewLaunch}
                    onChange={e => setItemForm(p => ({ ...p, isNewLaunch: e.target.checked }))}
                    sx={{ '&.Mui-checked': { color: '#c86030' } }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: 13.5, fontFamily: 'Inter, sans-serif' }}>
                    New Launch
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={itemForm.isBestSeller}
                    onChange={e => setItemForm(p => ({ ...p, isBestSeller: e.target.checked }))}
                    sx={{ '&.Mui-checked': { color: '#e6a817' } }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: 13.5, fontFamily: 'Inter, sans-serif' }}>
                    Best Seller
                  </Typography>
                }
              />
            </FormGroup>
          </Box>
        </AppModal>
      </Box>
    );
  }

  /* ── CATEGORIES LIST ── */
  return (
    <Box>
      <Toast msg={toast} />
      <PageHeader
        label="MENU"
        title="Menu Categories"
        subtitle="Manage your cafe menu categories and items."
        action={addBtn('Add Category', openAddCat)}
      />
      <Box sx={{ mb: 2.5 }}>
        <TextField
          placeholder="Search categories..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          size="small"
          sx={{
            width: 280,
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
              bgcolor: '#fff',
              height: 38,
              fontSize: 14,
              fontFamily: 'Inter, sans-serif',
              '& fieldset': { borderColor: '#eae7e2' },
              '&.Mui-focused fieldset': { borderColor: '#c86030' },
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 17, color: '#999' }} />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
      <Box
        sx={{
          bgcolor: '#fff',
          borderRadius: '20px',
          border: '1px solid #eae7e2',
          overflow: 'hidden',
        }}
      >
        {filteredCats.length === 0 ? (
          <EmptyState message="No categories found." />
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={hSx}>Category</TableCell>
                  <TableCell sx={{ ...hSx, textAlign: 'center' }}>Items</TableCell>
                  <TableCell sx={hSx}>Tags</TableCell>
                  <TableCell sx={hSx}>Status</TableCell>
                  <TableCell sx={hSx}>Guest Menu</TableCell>
                  <TableCell sx={{ ...hSx, textAlign: 'center' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCats.map(cat => {
                  const items = itemsMap.get(cat.id) || [];
                  // Get pricing info using proper logic
                  const pricingType = getPricingTypeFromCat(cat);
                  const hasMultiplePrices = pricingType !== 'single';
                  const pricingLabel =
                    cat.halfFullLabel ||
                    (pricingType === 'half_full'
                      ? 'Half / Full'
                      : pricingType === 'size'
                        ? '6" / 9"'
                        : pricingType === 'quantity'
                          ? '5 pcs / 8 pcs'
                          : '');

                  return (
                    <TableRow
                      key={cat.id}
                      sx={{ '&:hover': { bgcolor: '#faf9f7' }, '&:last-child td': { border: 0 } }}
                    >
                      <TableCell sx={cSx}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Box
                            component="img"
                            src={cat.image}
                            sx={{
                              width: 42,
                              height: 42,
                              borderRadius: '10px',
                              objectFit: 'cover',
                              bgcolor: '#eeedea',
                              flexShrink: 0,
                            }}
                            onError={(e: any) => (e.target.style.display = 'none')}
                          />
                          <Box>
                            <Typography
                              sx={{
                                fontSize: 14,
                                fontWeight: 600,
                                color: '#1a1a1a',
                                fontFamily: 'Inter, sans-serif',
                              }}
                            >
                              {cat.name}
                            </Typography>
                            {hasMultiplePrices && (
                              <Typography
                                sx={{
                                  fontSize: 11,
                                  color: '#999',
                                  fontFamily: 'Inter, sans-serif',
                                }}
                              >
                                {pricingLabel}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ ...cSx, textAlign: 'center' }}>
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: '#333',
                            fontFamily: 'Inter, sans-serif',
                          }}
                        >
                          {items.length}
                        </Typography>
                      </TableCell>
                      <TableCell sx={cSx}>
                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                          {cat.isNewLaunch && (
                            <Chip
                              icon={<FiberNewRoundedIcon sx={{ fontSize: 14 }} />}
                              label="New Launch"
                              size="small"
                              sx={{
                                bgcolor: '#fef3f0',
                                color: '#c86030',
                                fontSize: 10,
                                height: 22,
                                fontWeight: 700,
                              }}
                            />
                          )}
                          {cat.isBestSeller && (
                            <Chip
                              icon={<StarRoundedIcon sx={{ fontSize: 14 }} />}
                              label="Best Seller"
                              size="small"
                              sx={{
                                bgcolor: '#fff8e1',
                                color: '#e6a817',
                                fontSize: 10,
                                height: 22,
                                fontWeight: 700,
                              }}
                            />
                          )}
                          {hasMultiplePrices && (
                            <Chip
                              label={pricingLabel}
                              size="small"
                              sx={{
                                bgcolor: '#eeedea',
                                color: '#555',
                                fontSize: 10,
                                height: 22,
                                fontWeight: 600,
                              }}
                            />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell sx={cSx}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip
                            label={cat.isLive ? 'LIVE' : 'DRAFT'}
                            size="small"
                            sx={{
                              bgcolor: cat.isLive ? '#e3f0e8' : '#eeedea',
                              color: cat.isLive ? '#2e7d32' : '#888',
                              fontWeight: 600,
                              fontSize: 11,
                              height: 24,
                              borderRadius: '12px',
                            }}
                          />
                          <ToggleSwitch
                            checked={cat.isLive}
                            onChange={v =>
                              setCategories(p =>
                                p.map(c => (c.id === cat.id ? { ...c, isLive: v } : c))
                              )
                            }
                          />
                        </Box>
                      </TableCell>
                      <TableCell sx={cSx}>
                        <ToggleSwitch
                          checked={cat.showOnGuestMenu}
                          onChange={v =>
                            setCategories(p =>
                              p.map(c => (c.id === cat.id ? { ...c, showOnGuestMenu: v } : c))
                            )
                          }
                        />
                      </TableCell>
                      <TableCell sx={{ ...cSx, textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                          <Button
                            size="small"
                            onClick={() => setViewCat(cat)}
                            sx={{
                              color: '#c86030',
                              fontWeight: 600,
                              fontSize: 12,
                              textTransform: 'none',
                              fontFamily: 'Inter, sans-serif',
                              borderRadius: '8px',
                              px: 1.5,
                              '&:hover': { bgcolor: '#fef3f0' },
                            }}
                          >
                            View
                          </Button>
                          <IconButton
                            size="small"
                            onClick={() => openEditCat(cat)}
                            sx={{
                              color: '#888',
                              '&:hover': { color: '#c86030', bgcolor: '#fef3f0' },
                            }}
                          >
                            <EditOutlinedIcon sx={{ fontSize: 17 }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => deleteCat(cat.id)}
                            sx={{
                              color: '#888',
                              '&:hover': { color: '#c62828', bgcolor: '#fce4e4' },
                            }}
                          >
                            <DeleteOutlineRoundedIcon sx={{ fontSize: 17 }} />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      {/* Add/Edit Category Modal */}
      <AppModal
        open={addCatOpen}
        onClose={() => setAddCatOpen(false)}
        title={editCat ? 'Edit Category' : 'Add Category'}
        subtitle="Configure your menu category"
        actions={
          <>
            <ModalCancelBtn onClick={() => setAddCatOpen(false)} />
            <ModalSubmitBtn>{editCat ? 'Update' : 'Create Category'}</ModalSubmitBtn>
          </>
        }
      >
        <Box
          component="form"
          onSubmit={submitCat}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, py: 1 }}
        >
          <TextField
            label="Category Name"
            required
            value={catForm.name}
            onChange={e => setCatForm(p => ({ ...p, name: e.target.value }))}
            fullWidth
            sx={inputSx}
          />
          <TextField
            label="Image URL"
            value={catForm.image}
            onChange={e => setCatForm(p => ({ ...p, image: e.target.value }))}
            fullWidth
            sx={inputSx}
          />

          {/* Pricing Type Selection */}
          <FormControl fullWidth sx={inputSx}>
            <InputLabel>Pricing Type</InputLabel>
            <Select
              value={catForm.pricingType}
              label="Pricing Type"
              onChange={e =>
                setCatForm(p => ({ ...p, pricingType: e.target.value as PricingType }))
              }
            >
              <MuiMenuItem value="single">{PRICING_TYPE_LABELS.single}</MuiMenuItem>
              <MuiMenuItem value="half_full">{PRICING_TYPE_LABELS.half_full}</MuiMenuItem>
              <MuiMenuItem value="size">{PRICING_TYPE_LABELS.size}</MuiMenuItem>
              <MuiMenuItem value="quantity">{PRICING_TYPE_LABELS.quantity}</MuiMenuItem>
            </Select>
          </FormControl>

          <FormGroup row sx={{ gap: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={catForm.isNewLaunch}
                  onChange={e => setCatForm(p => ({ ...p, isNewLaunch: e.target.checked }))}
                  sx={{ '&.Mui-checked': { color: '#c86030' } }}
                />
              }
              label={
                <Typography sx={{ fontSize: 13.5, fontFamily: 'Inter, sans-serif' }}>
                  New Launch
                </Typography>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={catForm.showOnGuestMenu}
                  onChange={e => setCatForm(p => ({ ...p, showOnGuestMenu: e.target.checked }))}
                  sx={{ '&.Mui-checked': { color: '#c86030' } }}
                />
              }
              label={
                <Typography sx={{ fontSize: 13.5, fontFamily: 'Inter, sans-serif' }}>
                  Show on Guest Menu
                </Typography>
              }
            />
          </FormGroup>

          {/* Pricing Types Management */}
          <Box
            sx={{
              mt: 2,
              p: 2,
              bgcolor: '#faf9f7',
              borderRadius: '10px',
              border: '1px solid #eae7e2',
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 600,
                color: '#666',
                mb: 1,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Pricing Configuration
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={openPricingTypesManager}
              sx={{
                borderColor: '#c86030',
                color: '#c86030',
                textTransform: 'none',
                fontSize: 13,
                fontFamily: 'Inter, sans-serif',
                '&:hover': { bgcolor: '#fef3f0', borderColor: '#c86030' },
              }}
            >
              Manage Pricing Types
            </Button>
          </Box>
        </Box>
      </AppModal>

      {/* Pricing Types Manager Modal */}
      <AppModal
        open={pricingTypesOpen}
        onClose={() => setPricingTypesOpen(false)}
        title="Manage Pricing Types"
        subtitle="Create, edit, update and delete custom pricing configurations"
        maxWidth="md"
        actions={
          <>
            <ModalCancelBtn onClick={() => setPricingTypesOpen(false)} />
            <Button
              onClick={openAddPricingType}
              startIcon={<AddRoundedIcon />}
              sx={{
                bgcolor: '#c86030',
                color: '#fff',
                borderRadius: '20px',
                px: 2.5,
                py: 1,
                textTransform: 'none',
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                fontWeight: 600,
                '&:hover': { bgcolor: '#a8502a' },
              }}
            >
              Add Pricing Type
            </Button>
          </>
        }
      >
        <Box sx={{ py: 1 }}>
          {/* List of Pricing Types */}
          {pricingTypes.length === 0 ? (
            <EmptyState message="No pricing types found. Click 'Add Pricing Type' to create one." />
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {pricingTypes.map(type => (
                <Box
                  key={type.id}
                  sx={{
                    p: 2,
                    bgcolor: '#faf9f7',
                    borderRadius: '10px',
                    border: '1px solid #eae7e2',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: '#1a1a1a',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {type.name}
                      {type.isBuiltIn && (
                        <Chip
                          label="Built-in"
                          size="small"
                          sx={{
                            ml: 1,
                            bgcolor: '#eeedea',
                            color: '#666',
                            fontSize: 10,
                            height: 18,
                          }}
                        />
                      )}
                    </Typography>
                    {type.description && (
                      <Typography
                        sx={{ fontSize: 12, color: '#888', fontFamily: 'Inter, sans-serif' }}
                      >
                        {type.description}
                      </Typography>
                    )}
                    {type.options.length > 0 && (
                      <Typography
                        sx={{
                          fontSize: 11,
                          color: '#c86030',
                          mt: 0.5,
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        Options: {type.options.map(o => o.label).join(' / ')}
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {!type.isBuiltIn && (
                      <>
                        <Button
                          size="small"
                          onClick={() => openEditPricingType(type)}
                          startIcon={<EditOutlinedIcon sx={{ fontSize: 16 }} />}
                          sx={{
                            color: '#c86030',
                            borderColor: '#c86030',
                            border: '1px solid',
                            bgcolor: 'transparent',
                            borderRadius: '8px',
                            px: 1.5,
                            py: 0.5,
                            textTransform: 'none',
                            fontSize: 12,
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 500,
                            '&:hover': { color: '#fff', bgcolor: '#c86030' },
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          onClick={() => handleDeletePricingType(type.id)}
                          startIcon={<DeleteOutlineRoundedIcon sx={{ fontSize: 16 }} />}
                          sx={{
                            color: deleteConfirmId === type.id ? '#c62828' : '#c62828',
                            borderColor: deleteConfirmId === type.id ? '#c62828' : '#c62828',
                            border: '1px solid',
                            bgcolor: deleteConfirmId === type.id ? '#fce4e4' : 'transparent',
                            borderRadius: '8px',
                            px: 1.5,
                            py: 0.5,
                            textTransform: 'none',
                            fontSize: 12,
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 500,
                            '&:hover': {
                              color: '#fff',
                              bgcolor: '#c62828',
                              borderColor: '#c62828',
                            },
                          }}
                        >
                          {deleteConfirmId === type.id ? 'Confirm Delete' : 'Delete'}
                        </Button>
                      </>
                    )}
                    {type.isBuiltIn && (
                      <Chip
                        label="Cannot Edit/Delete"
                        size="small"
                        sx={{ bgcolor: '#eeedea', color: '#888', fontSize: 11, height: 24 }}
                      />
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          )}

          {/* Add/Edit Pricing Type Form */}
          {editPricingType !== null && (
            <Box
              component="form"
              onSubmit={submitPricingType}
              sx={{
                mt: 3,
                p: 2.5,
                bgcolor: '#fff',
                borderRadius: '12px',
                border: '2px solid #c86030',
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#c86030',
                  mb: 2,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {editPricingType ? 'Edit Pricing Type' : 'New Pricing Type'}
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Name"
                  required
                  value={pricingTypeForm.name}
                  onChange={e => setPricingTypeForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="e.g., Portion Size, Box Size"
                  fullWidth
                  sx={inputSx}
                />
                <TextField
                  label="Description (Optional)"
                  value={pricingTypeForm.description}
                  onChange={e => setPricingTypeForm(p => ({ ...p, description: e.target.value }))}
                  placeholder="Brief description of this pricing type"
                  fullWidth
                  sx={inputSx}
                />

                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#666',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  Define Two Options:
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <TextField
                    label="Option 1 Label"
                    required
                    value={pricingTypeForm.option1Label}
                    onChange={e =>
                      setPricingTypeForm(p => ({ ...p, option1Label: e.target.value }))
                    }
                    placeholder="e.g., Small, 500ml"
                    sx={inputSx}
                  />
                  <TextField
                    label="Option 2 Label"
                    required
                    value={pricingTypeForm.option2Label}
                    onChange={e =>
                      setPricingTypeForm(p => ({ ...p, option2Label: e.target.value }))
                    }
                    placeholder="e.g., Large, 1L"
                    sx={inputSx}
                  />
                </Box>

                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      bgcolor: '#c86030',
                      color: '#fff',
                      borderRadius: '20px',
                      textTransform: 'none',
                      fontFamily: 'Inter, sans-serif',
                      '&:hover': { bgcolor: '#a8502a' },
                    }}
                  >
                    {editPricingType ? 'Update' : 'Create'}
                  </Button>
                  <Button
                    onClick={() => setEditPricingType(null)}
                    sx={{
                      color: '#666',
                      textTransform: 'none',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </AppModal>
    </Box>
  );
}
