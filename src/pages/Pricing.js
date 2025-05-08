import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Pricing() {
  const { user } = useAuth();
  const [billingCycle, setBillingCycle] = useState('monthly');

  // Plan data configuration
  const plans = [
    {
      name: 'Starter',
      monthly: 0,
      annually: 0,
      features: [
        '5 shortened links/month',
        'Basic analytics',
        'Ad-supported'
      ],
      cta: user ? 'Current Plan' : 'Get Started'
    },
    {
      name: 'Pro',
      monthly: 9,
      annually: 90,
      features: [
        'Unlimited links',
        'Advanced analytics',
        'Custom slugs',
        'No ads',
        'Priority support'
      ],
      cta: 'Upgrade'
    },
    {
      name: 'Enterprise',
      monthly: 29,
      annually: 300,
      features: [
        'All Pro features',
        'Team members',
        'API access',
        'White-labeling',
        'Dedicated account manager'
      ],
      cta: 'Contact Sales'
    }
  ];

  return (
    <div className="pricing-page">
      <header className="pricing-header">
        <h1>Simple, transparent pricing</h1>
        <p>Start for free, upgrade when you need</p>
        
        {/* Billing */}
        <div className="toggle-container">
          <span>Monthly</span>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              onChange={() => setBillingCycle(prev => 
                prev === 'monthly' ? 'annually' : 'monthly'
              )}
              aria-label="Toggle billing cycle"
            />
            <span className="slider"></span>
          </label>
          <span>Annually <span className="discount-badge">(16% off)</span></span>
        </div>
      </header>

      {/* Plans*/}
      <div className="plans-grid">
        {plans.map((plan) => (
          <div 
            key={plan.name} 
            className={`plan-card ${plan.name.toLowerCase()}`}
            aria-label={`${plan.name} plan`}
          >
            <h3>{plan.name}</h3>
            <div className="price">
              ${billingCycle === 'monthly' ? plan.monthly : plan.annually}
              <span>/mo</span>
              {billingCycle === 'annually' && (
                <div className="billing-note">billed annually</div>
              )}
            </div>
            <ul className="features">
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <Link 
              to={user ? '/dashboard' : '/login'} 
              className={`cta-button ${plan.name.toLowerCase()}`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}