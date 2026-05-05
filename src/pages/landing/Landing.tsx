import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  Drawer,
  IconButton,
  Divider,
  useMediaQuery,
  useTheme,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Checkbox,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LaunchIcon from '@mui/icons-material/Launch';
import StarIcon from '@mui/icons-material/Star';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { addRaisedRequest } from 'data/raisedRequests';
import TakeoutDiningIcon from '@mui/icons-material/TakeoutDining';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { MENU_CATEGORIES, type MenuCategoryData, type MenuItemData } from 'data/menuData';

type CartItem = { id: number; name: string; price: number; qty: number; variant?: string };
type SizePickerState = {
  itemId: number;
  catId: number;
  selectedSize: 'option1' | 'option2';
} | null;
type CustomerInfo = {
  name: string;
  phone: string;
  tableNumber: string;
  consent: boolean;
  orderType: 'dine-in' | 'takeaway' | null;
};

// Sort: new launch → best sellers → normal
const sortedCategories = [...MENU_CATEGORIES].sort((a, b) => {
  const rank = (c: MenuCategoryData) => (c.isNewLaunch ? 0 : c.isBestSeller ? 1 : 2);
  return rank(a) - rank(b);
});

export default function Landing() {
  const [openCat, setOpenCat] = useState<number | null>(sortedCategories[0]?.id ?? null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [sizePicker, setSizePicker] = useState<SizePickerState>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    tableNumber: '',
    consent: false,
    orderType: null,
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [issueOpen, setIssueOpen] = useState(false);
  const [issueForm, setIssueForm] = useState({ name: '', phone: '', orderNumber: '', reason: '' });
  const [issueSent, setIssueSent] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const addToCart = (item: MenuItemData, variant?: string, variantPrice?: number) => {
    const cartId = variant === 'option1' ? item.id + 100000 : item.id;
    const name =
      variant === 'option1'
        ? `${item.name} (Small)`
        : variant === 'option2'
          ? `${item.name} (Large)`
          : item.name;
    const price = variantPrice ?? item.prices?.single ?? item.price ?? 0;
    setCart(prev => {
      const ex = prev.find(c => c.id === cartId);
      if (ex) return prev.map(c => (c.id === cartId ? { ...c, qty: c.qty + 1 } : c));
      return [...prev, { id: cartId, name, price, qty: 1, variant }];
    });
  };

  const handleAddClick = (item: MenuItemData, cat: MenuCategoryData, e: React.MouseEvent) => {
    e.stopPropagation();
    const pricingType = cat.pricingType || 'single';
    if (pricingType !== 'single') {
      // Has multiple pricing options
      setSizePicker({ itemId: item.id, catId: cat.id, selectedSize: 'option1' });
    } else {
      addToCart(item);
    }
  };

  const confirmSizePicker = (item: MenuItemData, cat: MenuCategoryData) => {
    if (!sizePicker) return;
    const isOption1 = sizePicker.selectedSize === 'option1';
    const pricingType = cat.pricingType || 'single';

    let price: number;
    if (pricingType === 'half_full') {
      price = isOption1
        ? (item.prices?.half ?? item.halfPrice ?? 0)
        : (item.prices?.full ?? item.price ?? 0);
    } else {
      price = isOption1
        ? (item.prices?.option1 ?? item.halfPrice ?? 0)
        : (item.prices?.option2 ?? item.price ?? 0);
    }

    addToCart(item, sizePicker.selectedSize, price);
    setSizePicker(null);
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev =>
      prev.map(c => (c.id === id ? { ...c, qty: c.qty + delta } : c)).filter(c => c.qty > 0)
    );
  };

  const getQty = (id: number) => cart.find(c => c.id === id)?.qty ?? 0;
  const getTotalQtyForItem = (id: number) => {
    const option2 = cart.find(c => c.id === id)?.qty ?? 0;
    const option1 = cart.find(c => c.id === id + 100000)?.qty ?? 0;
    return option2 + option1;
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f3ef', fontFamily: 'Inter, sans-serif' }}>
      {/* ── NAVBAR ── */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          bgcolor: 'rgba(245,243,239,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #e8e4de',
          px: { xs: 2, md: 5 },
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
          <Box
            component="img"
            src="/logo.png"
            alt="Cafe Chapter 1"
            sx={{ width: 40, height: 40, objectFit: 'contain' }}
          />
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: '#1a1a1a', lineHeight: 1.1 }}>
              Cafe Chapter 1
            </Typography>
            <Typography
              sx={{
                fontSize: 8.5,
                color: '#999',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              RESTRO PVT. LTD.
            </Typography>
          </Box>
        </Box>
        <Typography
          component={RouterLink}
          to="/portal"
          sx={{
            fontSize: 14,
            color: '#555',
            cursor: 'pointer',
            textDecoration: 'none',
            ml: 2,
            '&:hover': { color: '#1a1a1a' },
          }}
        >
          Login
        </Typography>
        <Box sx={{ ml: 'auto' }}>
          <Button
            onClick={() => setCartOpen(true)}
            startIcon={<ShoppingCartOutlinedIcon sx={{ fontSize: 18 }} />}
            sx={{
              bgcolor: '#1a1a1a',
              color: '#fff',
              borderRadius: '20px',
              px: 2.5,
              py: 0.8,
              textTransform: 'none',
              fontSize: 13.5,
              '&:hover': { bgcolor: '#333' },
            }}
          >
            Cart {totalItems > 0 && `(${totalItems})`}
          </Button>
        </Box>
      </Box>

      {/* ── HERO ── */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: 340, md: 440 },
          overflow: 'hidden',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1400&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
        }}
      >
        <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(20,15,10,0.52)' }} />
        <Box
          sx={{ position: 'relative', px: { xs: 3, md: 6 }, pt: { xs: 5, md: 8 }, maxWidth: 600 }}
        >
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              mb: 1.5,
            }}
          >
            OPEN TODAY · 10AM – 12:01 AM
          </Typography>
          <Typography
            sx={{
              color: '#fff',
              fontSize: { xs: 34, md: 46 },
              fontWeight: 800,
              lineHeight: 1.1,
              mb: 1.5,
            }}
          >
            Slow coffee.
            <br />
            Quick chapters.
          </Typography>
          <Typography
            sx={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, mb: 3, lineHeight: 1.6 }}
          >
            Browse the menu, build your order, and pay by UPI — we'll
            <br />
            have it ready before your next page turn.
          </Typography>
          <Button
            endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
            onClick={() =>
              document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' })
            }
            sx={{
              bgcolor: '#c86030',
              color: '#fff',
              borderRadius: '24px',
              px: 3,
              py: 1.2,
              textTransform: 'none',
              fontSize: 14,
              fontWeight: 500,
              '&:hover': { bgcolor: '#a8502a' },
            }}
          >
            Order now
          </Button>
        </Box>
      </Box>

      {/* ── MENU SECTION ── */}
      <Box id="menu-section" sx={{ px: { xs: 2, md: 5 }, py: 5, maxWidth: 1200, mx: 'auto' }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            sx={{
              color: '#c86030',
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              mb: 0.5,
            }}
          >
            THE MENU
          </Typography>
          <Typography sx={{ fontSize: { xs: 28, md: 36 }, fontWeight: 700, color: '#1a1a1a' }}>
            Today's offerings
          </Typography>
        </Box>

        {/* Category cards grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)' },
            gap: 2.5,
          }}
        >
          {sortedCategories.map(cat => {
            const isOpen = openCat === cat.id;
            return (
              <Box key={cat.id} sx={{ gridColumn: isOpen ? { xs: '1', sm: '1 / -1' } : undefined }}>
                {/* Category card */}
                <Box
                  onClick={() => setOpenCat(isOpen ? null : cat.id)}
                  sx={{
                    bgcolor: '#fff',
                    borderRadius: isOpen ? '16px 16px 0 0' : '16px',
                    border: cat.isNewLaunch
                      ? '2px solid #c86030'
                      : cat.isBestSeller
                        ? '2px solid #e6a817'
                        : '1px solid #eae7e2',
                    borderBottom: isOpen ? 'none' : undefined,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.15s, box-shadow 0.2s',
                    '&:hover': {
                      transform: isOpen ? 'none' : 'translateY(-2px)',
                      boxShadow: isOpen ? 'none' : '0 4px 16px rgba(0,0,0,0.06)',
                    },
                  }}
                >
                  {/* Image */}
                  <Box sx={{ position: 'relative', height: isOpen ? 140 : 180 }}>
                    <Box
                      component="img"
                      src={cat.image}
                      alt={cat.name}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(transparent 30%, rgba(0,0,0,0.6))',
                      }}
                    />
                    {cat.isNewLaunch && (
                      <Chip
                        label="🔥 NEW LAUNCH"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          bgcolor: '#c86030',
                          color: '#fff',
                          fontSize: 9,
                          fontWeight: 700,
                          height: 22,
                          borderRadius: '11px',
                          letterSpacing: '0.04em',
                        }}
                      />
                    )}
                    {!cat.isNewLaunch && cat.isBestSeller && (
                      <Chip
                        label="⭐ BEST SELLER"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          bgcolor: '#e6a817',
                          color: '#fff',
                          fontSize: 9,
                          fontWeight: 700,
                          height: 22,
                          borderRadius: '11px',
                          letterSpacing: '0.04em',
                        }}
                      />
                    )}
                    {/* Bottom overlay info */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 10,
                        left: 14,
                        right: 14,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                      }}
                    >
                      <Box>
                        <Typography sx={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>
                          {cat.name}
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>
                          {cat.items.length} items
                          {cat.pricingType && cat.pricingType !== 'single'
                            ? ` · ${cat.pricingConfig?.labels?.join(' / ') || cat.halfFullLabel || 'Options'}`
                            : ''}
                        </Typography>
                      </Box>
                      {isOpen ? (
                        <ExpandLessRoundedIcon sx={{ color: '#fff', fontSize: 22 }} />
                      ) : (
                        <ExpandMoreRoundedIcon sx={{ color: '#fff', fontSize: 22 }} />
                      )}
                    </Box>
                  </Box>
                </Box>

                {/* Items list — shown when category is open */}
                {isOpen && (
                  <Box
                    sx={{
                      bgcolor: '#fff',
                      border: '1px solid #eae7e2',
                      borderTop: 'none',
                      borderRadius: '0 0 16px 16px',
                      overflow: 'hidden',
                    }}
                  >
                    {cat.items.map((item, idx) => {
                      const pricingType = cat.pricingType || 'single';
                      const hasVariants = pricingType !== 'single';

                      // Get prices based on pricing type
                      let displayPrice: number;
                      let price1: number, price2: number;
                      if (pricingType === 'half_full') {
                        price1 = item.prices?.half ?? item.halfPrice ?? 0;
                        price2 = item.prices?.full ?? item.price ?? 0;
                        displayPrice = price1 || price2;
                      } else if (hasVariants) {
                        price1 = item.prices?.option1 ?? item.halfPrice ?? 0;
                        price2 = item.prices?.option2 ?? item.price ?? 0;
                        displayPrice = price1 || price2;
                      } else {
                        displayPrice = item.prices?.single ?? item.price ?? 0;
                        price1 = 0;
                        price2 = 0;
                      }

                      const totalQty = hasVariants ? getTotalQtyForItem(item.id) : getQty(item.id);
                      const isPickerOpen =
                        sizePicker?.itemId === item.id && sizePicker?.catId === cat.id;

                      // Get labels from pricing config
                      let labels: string[] = ['Option 1', 'Option 2'];
                      if (cat.pricingConfig?.labels) {
                        labels = cat.pricingConfig.labels;
                      } else if (pricingType === 'half_full') {
                        labels = ['Half', 'Full'];
                      } else if (pricingType === 'size') {
                        labels = ['6 inch', '9 inch'];
                      } else if (pricingType === 'quantity') {
                        labels = ['5 pcs', '8 pcs'];
                      }
                      return (
                        <Box key={item.id}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 2,
                              px: { xs: 2, md: 3 },
                              py: 1.6,
                              borderBottom:
                                idx < cat.items.length - 1 && !isPickerOpen
                                  ? '1px solid #f0eeea'
                                  : 'none',
                              '&:hover': { bgcolor: '#faf9f7' },
                              transition: 'background 0.12s',
                            }}
                          >
                            {/* Item name */}
                            <Box sx={{ flex: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Typography
                                  sx={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}
                                >
                                  {item.name}
                                </Typography>
                                {item.isNewLaunch && (
                                  <Chip
                                    label="New"
                                    size="small"
                                    sx={{
                                      bgcolor: '#fef3f0',
                                      color: '#c86030',
                                      fontSize: 8,
                                      height: 16,
                                      fontWeight: 700,
                                      ml: 0.5,
                                    }}
                                  />
                                )}
                                {item.isBestSeller && (
                                  <Chip
                                    label="★ Best"
                                    size="small"
                                    sx={{
                                      bgcolor: '#fff8e1',
                                      color: '#e6a817',
                                      fontSize: 8,
                                      height: 16,
                                      fontWeight: 700,
                                      ml: 0.5,
                                    }}
                                  />
                                )}
                              </Box>
                            </Box>

                            {/* Price + add */}
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                flexShrink: 0,
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: hasVariants ? 12 : 14,
                                  fontWeight: 700,
                                  color: '#c86030',
                                  minWidth: 45,
                                  textAlign: 'right',
                                }}
                              >
                                {hasVariants ? `Starts ₹${displayPrice}` : `₹${displayPrice}`}
                              </Typography>
                              {totalQty === 0 ? (
                                <Button
                                  size="small"
                                  startIcon={<AddIcon sx={{ fontSize: 13 }} />}
                                  onClick={e => handleAddClick(item, cat, e)}
                                  sx={{
                                    bgcolor: '#1a1a1a',
                                    color: '#fff',
                                    borderRadius: '14px',
                                    px: 1.5,
                                    py: 0.3,
                                    fontSize: 12,
                                    textTransform: 'none',
                                    '&:hover': { bgcolor: '#333' },
                                    minWidth: 60,
                                  }}
                                >
                                  Add
                                </Button>
                              ) : (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <IconButton
                                    size="small"
                                    onClick={e => {
                                      e.stopPropagation();
                                      if (hasVariants) {
                                        setSizePicker({
                                          itemId: item.id,
                                          catId: cat.id,
                                          selectedSize: 'option1',
                                        });
                                      } else {
                                        updateQty(item.id, -1);
                                      }
                                    }}
                                    sx={{ bgcolor: '#eae7e2', width: 26, height: 26 }}
                                  >
                                    <RemoveIcon sx={{ fontSize: 13 }} />
                                  </IconButton>
                                  <Typography
                                    sx={{
                                      fontSize: 13,
                                      fontWeight: 600,
                                      minWidth: 18,
                                      textAlign: 'center',
                                    }}
                                  >
                                    {totalQty}
                                  </Typography>
                                  <IconButton
                                    size="small"
                                    onClick={e => {
                                      e.stopPropagation();
                                      if (hasVariants) {
                                        setSizePicker({
                                          itemId: item.id,
                                          catId: cat.id,
                                          selectedSize: 'option1',
                                        });
                                      } else {
                                        updateQty(item.id, 1);
                                      }
                                    }}
                                    sx={{
                                      bgcolor: '#1a1a1a',
                                      color: '#fff',
                                      width: 26,
                                      height: 26,
                                    }}
                                  >
                                    <AddIcon sx={{ fontSize: 13 }} />
                                  </IconButton>
                                </Box>
                              )}
                            </Box>
                          </Box>

                          {/* Size picker — inline below item */}
                          {isPickerOpen && (
                            <Box
                              sx={{
                                px: { xs: 2, md: 3 },
                                pb: 2,
                                pt: 0.5,
                                bgcolor: '#faf9f7',
                                borderBottom:
                                  idx < cat.items.length - 1 ? '1px solid #f0eeea' : 'none',
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: 12,
                                  fontWeight: 700,
                                  color: '#555',
                                  mb: 1,
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.06em',
                                }}
                              >
                                Choose size
                              </Typography>
                              <RadioGroup
                                value={sizePicker.selectedSize}
                                onChange={e =>
                                  setSizePicker(prev =>
                                    prev
                                      ? {
                                          ...prev,
                                          selectedSize: e.target.value as 'option1' | 'option2',
                                        }
                                      : null
                                  )
                                }
                              >
                                <FormControlLabel
                                  value="option1"
                                  control={
                                    <Radio
                                      size="small"
                                      sx={{ '&.Mui-checked': { color: '#c86030' }, py: 0.5 }}
                                    />
                                  }
                                  label={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                      <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                                        {labels[0]}
                                      </Typography>
                                      <Typography
                                        sx={{ fontSize: 13, fontWeight: 700, color: '#c86030' }}
                                      >
                                        ₹{price1}
                                      </Typography>
                                    </Box>
                                  }
                                />
                                <FormControlLabel
                                  value="option2"
                                  control={
                                    <Radio
                                      size="small"
                                      sx={{ '&.Mui-checked': { color: '#c86030' }, py: 0.5 }}
                                    />
                                  }
                                  label={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                      <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                                        {labels[1]}
                                      </Typography>
                                      <Typography
                                        sx={{ fontSize: 13, fontWeight: 700, color: '#c86030' }}
                                      >
                                        ₹{price2}
                                      </Typography>
                                    </Box>
                                  }
                                />
                              </RadioGroup>
                              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                                <Button
                                  size="small"
                                  onClick={e => {
                                    e.stopPropagation();
                                    confirmSizePicker(item, cat);
                                  }}
                                  sx={{
                                    bgcolor: '#c86030',
                                    color: '#fff',
                                    borderRadius: '12px',
                                    px: 2,
                                    py: 0.4,
                                    fontSize: 12,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    '&:hover': { bgcolor: '#a8502a' },
                                  }}
                                >
                                  Add to cart
                                </Button>
                                <Button
                                  size="small"
                                  onClick={e => {
                                    e.stopPropagation();
                                    setSizePicker(null);
                                  }}
                                  sx={{
                                    color: '#888',
                                    borderRadius: '12px',
                                    px: 1.5,
                                    py: 0.4,
                                    fontSize: 12,
                                    textTransform: 'none',
                                  }}
                                >
                                  Cancel
                                </Button>
                              </Box>
                            </Box>
                          )}
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* ── FOOTER ── */}
      <Box
        sx={{
          bgcolor: '#f5f3ef',
          borderTop: '1px solid #e8e4de',
          px: { xs: 3, md: 6 },
          py: { xs: 5, md: 6 },
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          {/* Main Footer Content */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '2fr 1fr 1fr' },
              gap: { xs: 4, md: 6 },
              mb: 4,
            }}
          >
            {/* Brand Column */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box
                  component="img"
                  src="/logo.png"
                  alt="Cafe Chapter 1"
                  sx={{ width: 48, height: 48, objectFit: 'contain' }}
                />
                <Box>
                  <Typography
                    sx={{ fontWeight: 700, fontSize: 16, color: '#1a1a1a', lineHeight: 1.2 }}
                  >
                    Cafe Chapter 1
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 10,
                      color: '#888',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                    }}
                  >
                    RESTAURANT PVT. LTD.
                  </Typography>
                </Box>
              </Box>
              <Typography
                sx={{ fontSize: 14, color: '#666', lineHeight: 1.7, maxWidth: 300, mb: 2 }}
              >
                A quiet corner where coffee meets craft. Experience the finest blends in the heart
                of New Delhi.
              </Typography>
            </Box>

            {/* Quick Links */}
            <Box>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#c86030',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  mb: 2,
                }}
              >
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography
                  component={RouterLink}
                  to="/portal"
                  sx={{
                    fontSize: 14,
                    color: '#555',
                    textDecoration: 'none',
                    '&:hover': { color: '#c86030' },
                    transition: 'color 0.2s',
                  }}
                >
                  Staff Login
                </Typography>
                <Typography
                  component="a"
                  href="#menu-section"
                  onClick={() =>
                    document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  sx={{
                    fontSize: 14,
                    color: '#555',
                    textDecoration: 'none',
                    '&:hover': { color: '#c86030' },
                    transition: 'color 0.2s',
                    cursor: 'pointer',
                  }}
                >
                  Our Menu
                </Typography>
                <Typography
                  component="a"
                  href="https://g.page/your-google-review-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    fontSize: 14,
                    color: '#555',
                    textDecoration: 'none',
                    '&:hover': { color: '#c86030' },
                    transition: 'color 0.2s',
                  }}
                >
                  Leave a Review
                </Typography>
                <Typography
                  component="a"
                  onClick={() => setIssueOpen(true)}
                  sx={{
                    fontSize: 14,
                    color: '#555',
                    textDecoration: 'none',
                    '&:hover': { color: '#c86030' },
                    transition: 'color 0.2s',
                    cursor: 'pointer',
                  }}
                >
                  Report Issue
                </Typography>
              </Box>
            </Box>

            {/* Visit Us */}
            <Box>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#c86030',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  mb: 2,
                }}
              >
                Visit Us
              </Typography>
              <Box
                component="a"
                href="https://maps.google.com/?q=135/3+Gautam+Nagar+Yusuf+Sarai+New+Delhi+110049"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1,
                  mb: 2,
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                <PlaceOutlinedIcon sx={{ fontSize: 18, color: '#c86030', mt: 0.2 }} />
                <Box>
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: '#555',
                      lineHeight: 1.6,
                      '&:hover': { color: '#c86030' },
                      transition: 'color 0.2s',
                    }}
                  >
                    135/3, Gautam Nagar, Yusuf Sarai
                    <br />
                    New Delhi, Delhi 110049
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 11,
                      color: '#c86030',
                      mt: 0.3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.3,
                    }}
                  >
                    <LaunchIcon sx={{ fontSize: 10 }} /> Open in Maps
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <ScheduleOutlinedIcon sx={{ fontSize: 18, color: '#888' }} />
                <Typography sx={{ fontSize: 14, color: '#555' }}>10:00 AM – 12:01 AM</Typography>
              </Box>
            </Box>
          </Box>

          {/* Order Online Section */}
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 700,
                color: '#888',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                mb: 3,
              }}
            >
              Order Online
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 3,
                flexWrap: 'wrap',
              }}
            >
              {/* Swiggy */}
              <Box
                component="a"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ textDecoration: 'none' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    px: 4,
                    py: 1.5,
                    borderRadius: '10px',
                    bgcolor: '#fc8019',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: 15,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 16px rgba(252, 128, 25, 0.35)',
                    },
                    transition: 'all 0.2s',
                  }}
                >
                  <Box
                    component="img"
                    src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/swiggy.svg"
                    alt=""
                    sx={{ height: 24, filter: 'brightness(0) invert(1)' }}
                  />
                  Swiggy
                </Box>
              </Box>
              {/* Zomato */}
              <Box
                component="a"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ textDecoration: 'none' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    px: 4,
                    py: 1.5,
                    borderRadius: '10px',
                    bgcolor: '#cb202d',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: 15,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 16px rgba(203, 32, 45, 0.35)',
                    },
                    transition: 'all 0.2s',
                  }}
                >
                  <Box
                    component="img"
                    src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/zomato.svg"
                    alt=""
                    sx={{ height: 24, filter: 'brightness(0) invert(1)' }}
                  />
                  Zomato
                </Box>
              </Box>
              {/* Magicpin */}
              <Box
                component="a"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ textDecoration: 'none' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    px: 4,
                    py: 1.5,
                    borderRadius: '10px',
                    bgcolor: '#6e41e2',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: 15,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 16px rgba(110, 65, 226, 0.35)',
                    },
                    transition: 'all 0.2s',
                  }}
                >
                  <Typography sx={{ fontSize: 16, fontWeight: 700 }}>M</Typography>
                  Magicpin
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Bottom Bar */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
              pt: 3,
              borderTop: '1px solid #e8e4de',
            }}
          >
            <Typography sx={{ fontSize: 12, color: '#888' }}>
              © 2023 Cafe Chapter 1 Restaurant Pvt. Ltd.
            </Typography>
            <Typography sx={{ fontSize: 12, color: '#888' }}>Made with ☕ in New Delhi</Typography>
          </Box>
        </Box>
      </Box>

      {/* ── CART DRAWER ── */}
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Box
          sx={{
            width: 340,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            bgcolor: '#fff',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2.5,
              borderBottom: '1px solid #eae7e2',
            }}
          >
            <Typography sx={{ fontSize: 17, fontWeight: 700, color: '#1a1a1a' }}>
              Your order
            </Typography>
            <IconButton size="small" onClick={() => setCartOpen(false)}>
              <CloseIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>
          <Box sx={{ flex: 1, overflowY: 'auto', p: 2.5 }}>
            {cart.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <ShoppingCartOutlinedIcon sx={{ fontSize: 40, color: '#ddd', mb: 1.5 }} />
                <Typography sx={{ fontSize: 14, color: '#999' }}>Your cart is empty</Typography>
              </Box>
            ) : (
              cart.map(item => (
                <Box
                  key={item.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <Box>
                    <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#1a1a1a' }}>
                      {item.name}
                    </Typography>
                    <Typography sx={{ fontSize: 12.5, color: '#888' }}>
                      ₹{item.price} each
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => updateQty(item.id, -1)}
                      sx={{ bgcolor: '#eae7e2', width: 26, height: 26 }}
                    >
                      <RemoveIcon sx={{ fontSize: 13 }} />
                    </IconButton>
                    <Typography
                      sx={{ fontSize: 14, fontWeight: 600, minWidth: 20, textAlign: 'center' }}
                    >
                      {item.qty}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => updateQty(item.id, 1)}
                      sx={{ bgcolor: '#1a1a1a', color: '#fff', width: 26, height: 26 }}
                    >
                      <AddIcon sx={{ fontSize: 13 }} />
                    </IconButton>
                  </Box>
                </Box>
              ))
            )}
          </Box>
          {cart.length > 0 && (
            <Box sx={{ p: 2.5, borderTop: '1px solid #eae7e2' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 700 }}>Total</Typography>
                <Typography sx={{ fontSize: 15, fontWeight: 700 }}>₹{totalPrice}</Typography>
              </Box>
              <Button
                fullWidth
                onClick={() => {
                  setCartOpen(false);
                  setCheckoutOpen(true);
                }}
                sx={{
                  bgcolor: '#c86030',
                  color: '#fff',
                  borderRadius: '20px',
                  py: 1.2,
                  fontSize: 14,
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#a8502a' },
                }}
              >
                Place order · ₹{totalPrice}
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>

      {/* ── CHECKOUT DRAWER ── */}
      <Drawer anchor="right" open={checkoutOpen} onClose={() => setCheckoutOpen(false)}>
        <Box
          sx={{
            width: { xs: '100vw', sm: 420 },
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            bgcolor: '#fff',
          }}
        >
          {/* Header with Logo and Back Button */}
          <Box sx={{ p: 3, borderBottom: '1px solid #eae7e2', bgcolor: '#faf9f7' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <IconButton onClick={() => setCheckoutOpen(false)} sx={{ mr: 1 }}>
                <ArrowBackIcon sx={{ fontSize: 20, color: '#555' }} />
              </IconButton>
              <Box
                component="img"
                src="/logo.png"
                alt="Cafe Chapter 1 Logo"
                sx={{ width: 50, height: 50, objectFit: 'contain' }}
              />
              <Box>
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#1a1a1a',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  Cafe Chapter 1
                </Typography>
                <Typography sx={{ fontSize: 11, color: '#666', fontFamily: 'Inter, sans-serif' }}>
                  Restaurant Pvt. Ltd.
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
              <PlaceOutlinedIcon sx={{ fontSize: 14, color: '#888' }} />
              <Typography sx={{ fontSize: 12, color: '#888' }}>
                135/3, Gautam Nagar, Yusuf Sarai, New Delhi, Delhi 110049
              </Typography>
            </Box>
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1, overflowY: 'auto', p: 3 }}>
            {orderPlaced ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <AutoAwesomeIcon sx={{ fontSize: 48, color: '#c86030' }} />
                </Box>
                <Typography sx={{ fontSize: 24, fontWeight: 700, color: '#1a1a1a', mb: 1 }}>
                  Order Placed!
                </Typography>
                <Typography sx={{ fontSize: 14, color: '#666', mb: 3 }}>
                  We'll notify you when your order is ready.
                </Typography>

                {/* Order Details Summary */}
                <Box
                  sx={{ bgcolor: '#f5f3ef', borderRadius: '12px', p: 2, mb: 3, textAlign: 'left' }}
                >
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#1a1a1a',
                      mb: 2,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    Order Summary
                  </Typography>
                  {cart.map(item => (
                    <Box
                      key={item.id}
                      sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
                    >
                      <Typography sx={{ fontSize: 13, color: '#555' }}>
                        {item.qty}x {item.name}
                      </Typography>
                      <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                        ₹{item.price * item.qty}
                      </Typography>
                    </Box>
                  ))}
                  <Divider sx={{ my: 1.5, borderColor: '#e8e4de' }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 700 }}>Total</Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: 700 }}>₹{totalPrice}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography sx={{ fontSize: 13, color: '#555' }}>Type</Typography>
                    <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#c86030' }}>
                      {customerInfo.orderType === 'dine-in' ? 'DINE IN' : 'TAKE AWAY'}
                    </Typography>
                  </Box>
                </Box>

                <Button
                  onClick={() => {
                    setOrderPlaced(false);
                    setCheckoutOpen(false);
                    setCart([]);
                    setCustomerInfo({
                      name: '',
                      phone: '',
                      tableNumber: '',
                      consent: false,
                      orderType: null,
                    });
                  }}
                  sx={{
                    bgcolor: '#1a1a1a',
                    color: '#fff',
                    borderRadius: '20px',
                    px: 4,
                    py: 1.2,
                    fontSize: 14,
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': { bgcolor: '#333' },
                  }}
                >
                  Close
                </Button>
              </Box>
            ) : (
              <>
                {/* Order Type Selection */}
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#1a1a1a',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    mb: 2,
                  }}
                >
                  Select Order Type *
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <Button
                    fullWidth
                    onClick={() => setCustomerInfo(prev => ({ ...prev, orderType: 'dine-in' }))}
                    sx={{
                      bgcolor: customerInfo.orderType === 'dine-in' ? '#c86030' : '#fff',
                      color: customerInfo.orderType === 'dine-in' ? '#fff' : '#1a1a1a',
                      border: '2px solid',
                      borderColor: customerInfo.orderType === 'dine-in' ? '#c86030' : '#e8e4de',
                      borderRadius: '12px',
                      py: 1.5,
                      flexDirection: 'column',
                      gap: 0.5,
                      '&:hover': {
                        borderColor: '#c86030',
                        bgcolor: customerInfo.orderType === 'dine-in' ? '#a8502a' : '#faf9f7',
                      },
                    }}
                  >
                    <RestaurantIcon sx={{ fontSize: 24 }} />
                    <Typography sx={{ fontSize: 13, fontWeight: 600 }}>DINE IN</Typography>
                  </Button>
                  <Button
                    fullWidth
                    onClick={() => setCustomerInfo(prev => ({ ...prev, orderType: 'takeaway' }))}
                    sx={{
                      bgcolor: customerInfo.orderType === 'takeaway' ? '#c86030' : '#fff',
                      color: customerInfo.orderType === 'takeaway' ? '#fff' : '#1a1a1a',
                      border: '2px solid',
                      borderColor: customerInfo.orderType === 'takeaway' ? '#c86030' : '#e8e4de',
                      borderRadius: '12px',
                      py: 1.5,
                      flexDirection: 'column',
                      gap: 0.5,
                      '&:hover': {
                        borderColor: '#c86030',
                        bgcolor: customerInfo.orderType === 'takeaway' ? '#a8502a' : '#faf9f7',
                      },
                    }}
                  >
                    <TakeoutDiningIcon sx={{ fontSize: 24 }} />
                    <Typography sx={{ fontSize: 13, fontWeight: 600 }}>TAKE AWAY</Typography>
                  </Button>
                </Box>

                {/* Order Summary */}
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#1a1a1a',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    mb: 2,
                  }}
                >
                  Your Order ({totalItems} items)
                </Typography>
                <Box sx={{ bgcolor: '#f5f3ef', borderRadius: '12px', p: 2, mb: 3 }}>
                  {cart.map(item => (
                    <Box
                      key={item.id}
                      sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
                    >
                      <Typography sx={{ fontSize: 13, color: '#555' }}>
                        {item.qty}x {item.name}
                      </Typography>
                      <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                        ₹{item.price * item.qty}
                      </Typography>
                    </Box>
                  ))}
                  <Divider sx={{ my: 1.5, borderColor: '#e8e4de' }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 700 }}>Total</Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: 700 }}>₹{totalPrice}</Typography>
                  </Box>
                </Box>

                {/* Customer Details Form */}
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#1a1a1a',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    mb: 2,
                  }}
                >
                  Your Details
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                  <TextField
                    label="Your Name *"
                    fullWidth
                    value={customerInfo.name}
                    onChange={e => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        bgcolor: '#faf9f7',
                        fontSize: 14,
                      },
                      '& .MuiInputLabel-root': { fontSize: 13.5 },
                    }}
                  />
                  <TextField
                    label="Phone Number * (required to notify you when your order is ready)"
                    fullWidth
                    type="tel"
                    value={customerInfo.phone}
                    onChange={e => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                    required
                    placeholder="e.g. +91-9876543210"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        bgcolor: '#faf9f7',
                        fontSize: 14,
                      },
                      '& .MuiInputLabel-root': { fontSize: 13.5 },
                    }}
                  />
                  <TextField
                    label="Table Number *"
                    fullWidth
                    value={customerInfo.tableNumber}
                    onChange={e =>
                      setCustomerInfo(prev => ({ ...prev, tableNumber: e.target.value }))
                    }
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        bgcolor: '#faf9f7',
                        fontSize: 14,
                      },
                      '& .MuiInputLabel-root': { fontSize: 13.5 },
                    }}
                  />
                </Box>

                {/* Trust Message */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1,
                    bgcolor: '#f0f8f0',
                    borderRadius: '10px',
                    p: 2,
                    mb: 2,
                  }}
                >
                  <LockOutlinedIcon sx={{ fontSize: 16, color: '#4a7a5a', mt: 0.2 }} />
                  <Typography sx={{ fontSize: 12, color: '#4a7a5a', lineHeight: 1.5 }}>
                    Your data is used only for order processing. We never share it.
                  </Typography>
                </Box>

                {/* Consent Checkbox */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={customerInfo.consent}
                      onChange={e =>
                        setCustomerInfo(prev => ({ ...prev, consent: e.target.checked }))
                      }
                      sx={{ '&.Mui-checked': { color: '#c86030' } }}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
                      <Typography sx={{ fontSize: 12, color: '#555' }}>
                        I agree to the{' '}
                        <Typography
                          component={RouterLink}
                          to="/privacy-policy"
                          sx={{
                            color: '#c86030',
                            textDecoration: 'none',
                            fontWeight: 600,
                            '&:hover': { textDecoration: 'underline' },
                          }}
                        >
                          Privacy Policy
                        </Typography>
                        *
                      </Typography>
                    </Box>
                  }
                  sx={{ mb: 2 }}
                />
              </>
            )}
          </Box>

          {/* Footer */}
          {!orderPlaced && (
            <Box sx={{ p: 3, borderTop: '1px solid #eae7e2' }}>
              <Button
                fullWidth
                disabled={
                  !customerInfo.name ||
                  !customerInfo.phone ||
                  !customerInfo.tableNumber ||
                  !customerInfo.consent ||
                  !customerInfo.orderType
                }
                onClick={() => setOrderPlaced(true)}
                sx={{
                  bgcolor: '#1a1a1a',
                  color: '#fff',
                  borderRadius: '20px',
                  py: 1.4,
                  fontSize: 14,
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#333' },
                  '&:disabled': { bgcolor: '#ccc', color: '#888' },
                }}
              >
                Place Order · ₹{totalPrice}
              </Button>
              <Typography sx={{ fontSize: 11, color: '#bbb', textAlign: 'center', mt: 2 }}>
                © 2023 Cafe Chapter 1 Restaurant Pvt. Ltd.
              </Typography>
            </Box>
          )}
        </Box>
      </Drawer>

      {/* ── RAISE ISSUE MODAL ── */}
      <Drawer
        anchor="right"
        open={issueOpen}
        onClose={() => {
          setIssueOpen(false);
          setIssueSent(false);
          setIssueForm({ name: '', phone: '', orderNumber: '', reason: '' });
        }}
      >
        <Box
          sx={{
            width: { xs: '100vw', sm: 420 },
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            bgcolor: '#fff',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2.5,
              borderBottom: '1px solid #eae7e2',
              bgcolor: '#faf9f7',
            }}
          >
            <Typography sx={{ fontSize: 17, fontWeight: 700, color: '#1a1a1a' }}>
              Report an Issue
            </Typography>
            <IconButton
              size="small"
              onClick={() => {
                setIssueOpen(false);
                setIssueSent(false);
              }}
            >
              <CloseIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>
          <Box sx={{ flex: 1, overflowY: 'auto', p: 3 }}>
            {issueSent ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <ReportProblemIcon sx={{ fontSize: 48, color: '#c86030', mb: 2 }} />
                <Typography sx={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a', mb: 1 }}>
                  Issue Submitted
                </Typography>
                <Typography sx={{ fontSize: 14, color: '#666', mb: 3 }}>
                  Our team will review your request and get back to you shortly.
                </Typography>
                <Button
                  onClick={() => {
                    setIssueOpen(false);
                    setIssueSent(false);
                    setIssueForm({ name: '', phone: '', orderNumber: '', reason: '' });
                  }}
                  sx={{
                    bgcolor: '#1a1a1a',
                    color: '#fff',
                    borderRadius: '20px',
                    px: 4,
                    py: 1.2,
                    fontSize: 14,
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': { bgcolor: '#333' },
                  }}
                >
                  Close
                </Button>
              </Box>
            ) : (
              <Box
                component="form"
                sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
                onSubmit={e => {
                  e.preventDefault();
                  addRaisedRequest(issueForm);
                  setIssueSent(true);
                }}
              >
                <TextField
                  label="Your Name *"
                  required
                  value={issueForm.name}
                  onChange={e => setIssueForm(p => ({ ...p, name: e.target.value }))}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      bgcolor: '#faf9f7',
                      fontSize: 14,
                    },
                    '& .MuiInputLabel-root': { fontSize: 13.5 },
                  }}
                />
                <TextField
                  label="Phone Number *"
                  required
                  type="tel"
                  value={issueForm.phone}
                  onChange={e => setIssueForm(p => ({ ...p, phone: e.target.value }))}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      bgcolor: '#faf9f7',
                      fontSize: 14,
                    },
                    '& .MuiInputLabel-root': { fontSize: 13.5 },
                  }}
                />
                <TextField
                  label="Order Number *"
                  required
                  value={issueForm.orderNumber}
                  onChange={e => setIssueForm(p => ({ ...p, orderNumber: e.target.value }))}
                  fullWidth
                  placeholder="e.g. ORD-2104"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      bgcolor: '#faf9f7',
                      fontSize: 14,
                    },
                    '& .MuiInputLabel-root': { fontSize: 13.5 },
                  }}
                />
                <TextField
                  label="Reason / Details *"
                  required
                  multiline
                  rows={4}
                  value={issueForm.reason}
                  onChange={e => setIssueForm(p => ({ ...p, reason: e.target.value }))}
                  fullWidth
                  placeholder="Describe the issue..."
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      bgcolor: '#faf9f7',
                      fontSize: 14,
                    },
                    '& .MuiInputLabel-root': { fontSize: 13.5 },
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  disabled={
                    !issueForm.name ||
                    !issueForm.phone ||
                    !issueForm.orderNumber ||
                    !issueForm.reason
                  }
                  sx={{
                    bgcolor: '#c86030',
                    color: '#fff',
                    borderRadius: '20px',
                    py: 1.2,
                    fontSize: 14,
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': { bgcolor: '#a8502a' },
                    '&:disabled': { bgcolor: '#ccc', color: '#888' },
                  }}
                >
                  Submit Issue
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
